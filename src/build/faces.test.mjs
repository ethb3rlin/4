/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * Unit tests for the face pool of the build, with fake fetches, bodies,
 * clocks and writers, and the real image library. Run: `npm test`.
 * @module build/faces-test
 */

import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import sharp from "sharp";
import * as gatsbyNode from "../../gatsby-node.mjs";
import {
  COUNT,
  collectFaces,
  DEADLINE_MS,
  DIR,
  defaultEnv,
  fetchFace,
  isJpeg,
  MAX_BYTES,
  MAX_EDGE,
  MAX_FAILURES,
  MAX_REQUESTS,
  onPostBuild,
  PAUSE_MS,
  readLimited,
  resize,
  SIZE,
  SOURCE,
  storeFaces,
  TIMEOUT_MS,
  writeFaces,
} from "./faces.mjs";

/** The first bytes of a JPEG, and a few more. */
const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);

/** The headers of a JPEG answer. */
const AS_JPEG = { headers: { "content-type": "image/jpeg" } };

/** The headers of the for-sale page. */
const AS_HTML = { headers: { "content-type": "text/html" } };

/**
 * What the collection and the writing use, as in `faces.mjs`.
 * @typedef {object} Env
 * @property {function(string, RequestInit): Promise<Response>} fetch fetches
 * @property {function(number): Promise<unknown>} sleep waits that many ms
 * @property {function(): number} now the clock, in ms
 * @property {function(Uint8Array): Promise<Uint8Array>} resize resizes
 * @property {function(string, {recursive: boolean}): Promise<unknown>} mkdir
 *   creates the folder
 * @property {function(string, (string|Uint8Array)): Promise<void>} writeFile
 *   writes one file
 * @property {string} dir where the faces go
 */

/**
 * The parts of Gatsby's reporter the build hook uses, as in `faces.mjs`.
 * @typedef {object} Reporter
 * @property {function(string): void} info logs a line
 * @property {function(string): void} warn logs a warning
 */

/**
 * One call of a fake fetch.
 * @typedef {{url: string, opts: RequestInit}} Call
 */

/**
 * A fake fetch and the calls it received.
 * @typedef {object} FakeFetch
 * @property {function(string, RequestInit): Promise<Response>} fetch the fake
 * @property {Array<Call>} calls one entry per call
 */

/**
 * A body that records whether it was cancelled.
 * @typedef {object} TrackedBody
 * @property {ReadableStream<Uint8Array>} stream the body
 * @property {function(): boolean} cancelled whether it was cancelled
 */

/**
 * A fake fetch that answers each call with a body `bodyAt` makes for it.
 * @param {function(number): (string|Uint8Array<ArrayBuffer>|ReadableStream<Uint8Array>|null)} bodyAt
 *   the body for the call with that index, from 0
 * @param {ResponseInit} init status and headers
 * @returns {FakeFetch} the fake and its calls
 */
const fakeFetch = (bodyAt, init) => {
  /** @type {Array<Call>} */
  const calls = [];
  return {
    calls,
    /**
     * Records the call and answers with a fresh response.
     * @param {string} url the address asked for
     * @param {RequestInit} opts the options passed
     * @returns {Promise<Response>} the answer
     */
    fetch: async (url, opts) => {
      calls.push({ url, opts });
      return new Response(bodyAt(calls.length - 1), init);
    },
  };
};

/**
 * A JPEG-looking body that differs for each number.
 * @param {number} n which one
 * @returns {Uint8Array<ArrayBuffer>} the JPEG's first bytes, then `n`
 */
const face = (n) => new Uint8Array([0xff, 0xd8, 0xff, 0xe0, n >> 8, n & 255]);

/**
 * A body that holds the given bytes and records whether it was cancelled.
 * It never ends: only a cancel stops it.
 * @param {Uint8Array} bytes what it holds
 * @returns {TrackedBody} the body and its state
 */
const trackedBody = (bytes) => {
  let cancelled = false;
  /** @type {UnderlyingDefaultSource<Uint8Array>} */
  const source = {
    /**
     * Puts the bytes in the body.
     * @param {ReadableStreamDefaultController<Uint8Array>} controller the body's
     */
    start: (controller) => controller.enqueue(bytes),
    /** Records the cancel. */
    cancel: () => {
      cancelled = true;
    },
  };
  return {
    stream: new ReadableStream(source),
    /**
     * Whether the body was cancelled.
     * @returns {boolean} true once cancelled
     */
    cancelled: () => cancelled,
  };
};

/**
 * A body that sends 1 MiB chunks without end, and records whether it was
 * cancelled.
 * @returns {TrackedBody} the body and its state
 */
const endlessBody = () => {
  let cancelled = false;
  /** @type {UnderlyingDefaultSource<Uint8Array>} */
  const source = {
    /**
     * Adds one more chunk whenever the reader asks.
     * @param {ReadableStreamDefaultController<Uint8Array>} controller the body's
     */
    pull: (controller) => controller.enqueue(new Uint8Array(1024 * 1024)),
    /** Records the cancel. */
    cancel: () => {
      cancelled = true;
    },
  };
  return {
    stream: new ReadableStream(source),
    /**
     * Whether the body was cancelled.
     * @returns {boolean} true once cancelled
     */
    cancelled: () => cancelled,
  };
};

/**
 * Keeps the event loop alive until the signal aborts. The signal's own timer
 * does not, and Node 22's test runner cancels a test that waits on nothing
 * else.
 * @param {AbortSignal} signal the signal to wait for
 */
const holdUntilAbort = (signal) => {
  const hold = setInterval(() => {}, 1000);
  signal.addEventListener("abort", () => clearInterval(hold), { once: true });
};

/**
 * A fetch that never answers and fails once its signal aborts.
 * @param {string} _url the address asked for
 * @param {RequestInit} init the options, with the signal
 * @returns {Promise<Response>} rejects with the signal's reason
 */
const slowFetch = (_url, init) =>
  new Promise((_resolve, reject) => {
    const signal = /** @type {AbortSignal} */ (init.signal);
    holdUntilAbort(signal);
    signal.addEventListener("abort", () => reject(signal.reason), {
      once: true,
    });
  });

/**
 * A fetch that answers at once with the first bytes of a JPEG, then stalls
 * the body until its signal aborts, which errors the body as fetch does.
 * @param {string} _url the address asked for
 * @param {RequestInit} init the options, with the signal
 * @returns {Promise<Response>} the answer with the stalling body
 */
const stallingFetch = async (_url, init) => {
  const signal = /** @type {AbortSignal} */ (init.signal);
  holdUntilAbort(signal);
  /** @type {UnderlyingDefaultSource<Uint8Array>} */
  const source = {
    /**
     * Sends the first bytes, then errors the body once the signal aborts.
     * @param {ReadableStreamDefaultController<Uint8Array>} controller the body's
     */
    start: (controller) => {
      controller.enqueue(JPEG);
      signal.addEventListener("abort", () => controller.error(signal.reason), {
        once: true,
      });
    },
  };
  return new Response(new ReadableStream(source), AS_JPEG);
};

/**
 * A square or oblong JPEG of one color, made by the image library.
 * @param {number} width its width in pixels
 * @param {number} height its height in pixels
 * @returns {Promise<Uint8Array>} the JPEG
 */
const picture = (width, height) =>
  sharp({
    create: { width, height, channels: 3, background: "#ff0000" },
  })
    .jpeg()
    .toBuffer();

/**
 * An environment of fakes: no network, no clock, no image library, and a
 * record of what would have been written.
 * @param {FakeFetch} f the fetch to use
 * @param {function(): number} [now] the clock; one that stands at 0 unless
 *   a test passes another
 * @returns {{env: Env, sleeps: Array<number>,
 *   files: Map<string, (string|Uint8Array)>, dirs: Array<string>}} the
 *   environment and its records
 */
const fakeEnv = (f, now = () => 0) => {
  /** @type {Array<number>} */
  const sleeps = [];
  /** @type {Map<string, (string|Uint8Array)>} */
  const files = new Map();
  /** @type {Array<string>} */
  const dirs = [];
  return {
    sleeps,
    files,
    dirs,
    env: {
      fetch: f.fetch,
      /**
       * Records the pause and returns at once.
       * @param {number} ms the pause asked for
       * @returns {Promise<void>} at once
       */
      sleep: async (ms) => {
        sleeps.push(ms);
      },
      now,
      /**
       * Passes the image through unchanged.
       * @param {Uint8Array} bytes the image
       * @returns {Promise<Uint8Array>} the same bytes
       */
      resize: async (bytes) => bytes,
      /**
       * Records the folder.
       * @param {string} dir the folder
       * @returns {Promise<void>} at once
       */
      mkdir: async (dir) => {
        dirs.push(dir);
      },
      /**
       * Records the file.
       * @param {string} name the file's path
       * @param {(string|Uint8Array)} data its content
       * @returns {Promise<void>} at once
       */
      writeFile: async (name, data) => {
        files.set(name, data);
      },
      dir: "out/faces",
    },
  };
};

/**
 * A fake reporter that records its lines.
 * @returns {{reporter: Reporter,
 *   lines: Array<string>}} the reporter and its lines, each `info:` or
 *   `warn:` and the text
 */
const fakeReporter = () => {
  /** @type {Array<string>} */
  const lines = [];
  return {
    lines,
    reporter: {
      /**
       * Records an info line.
       * @param {string} text the line
       */
      info: (text) => {
        lines.push(`info: ${text}`);
      },
      /**
       * Records a warning.
       * @param {string} text the line
       */
      warn: (text) => {
        lines.push(`warn: ${text}`);
      },
    },
  };
};

test("the limits are the ones the spec names", () => {
  assert.equal(SOURCE, "https://thispersondoesnotexist.com/random-person.jpeg");
  assert.deepEqual(
    [
      COUNT,
      SIZE,
      PAUSE_MS,
      TIMEOUT_MS,
      MAX_BYTES,
      MAX_REQUESTS,
      MAX_FAILURES,
      DEADLINE_MS,
      MAX_EDGE,
    ],
    [100, 512, 250, 10000, 5242880, 500, 5, 180000, 2048],
  );
  assert.equal(DIR, "public/faces");
});

test("isJpeg knows a JPEG by its first three bytes", () => {
  assert.equal(isJpeg(JPEG), true);
  assert.equal(isJpeg(new Uint8Array([0xff, 0xd8, 0xff])), false);
  assert.equal(isJpeg(new TextEncoder().encode("<!DOCTYPE html>")), false);
  assert.equal(isJpeg(new Uint8Array([0xff, 0x00, 0xff, 0xe0])), false);
  assert.equal(isJpeg(new Uint8Array([0xff, 0xd8, 0x00, 0xe0])), false);
});

test("readLimited joins the chunks of a body, and reads no body as empty", async () => {
  const two = new ReadableStream({
    /**
     * Sends two chunks and ends.
     * @param {ReadableStreamDefaultController<Uint8Array>} controller the body's
     */
    start(controller) {
      controller.enqueue(JPEG.subarray(0, 2));
      controller.enqueue(JPEG.subarray(2));
      controller.close();
    },
  });
  assert.deepEqual(await readLimited(two, 100), JPEG);
  assert.deepEqual(await readLimited(null, 100), new Uint8Array(0));
});

test("readLimited stops an endless body at the limit and cancels it", async () => {
  const body = endlessBody();
  await assert.rejects(readLimited(body.stream, MAX_BYTES), {
    message: `source sent over ${MAX_BYTES} bytes`,
  });
  assert.equal(body.cancelled(), true);
});

test("fetchFace asks the source for a JPEG, with a 10 s timeout", async (t) => {
  const timeout = t.mock.method(AbortSignal, "timeout");
  const f = fakeFetch(() => JPEG, AS_JPEG);
  assert.deepEqual(await fetchFace(f.fetch), JPEG);
  assert.equal(f.calls[0].url, SOURCE);
  assert.deepEqual(f.calls[0].opts.headers, { accept: "image/jpeg" });
  assert.ok(f.calls[0].opts.signal instanceof AbortSignal);
  assert.deepEqual(timeout.mock.calls[0].arguments, [TIMEOUT_MS]);
});

test("fetchFace gives up on a source that does not answer in time", async () => {
  await assert.rejects(fetchFace(slowFetch, 20), { name: "TimeoutError" });
});

test("fetchFace gives up on a body that stalls past the timeout", async () => {
  await assert.rejects(fetchFace(stallingFetch, 20), { name: "TimeoutError" });
});

test("fetchFace refuses a failed answer and drops its body", async () => {
  const body = trackedBody(JPEG);
  const f = fakeFetch(() => body.stream, { ...AS_JPEG, status: 503 });
  await assert.rejects(fetchFace(f.fetch), { message: "source answered 503" });
  assert.equal(body.cancelled(), true);
  const empty = fakeFetch(() => null, { status: 404 });
  await assert.rejects(fetchFace(empty.fetch), {
    message: "source answered 404",
  });
});

test("fetchFace refuses the for-sale page and a body without a type", async () => {
  const body = trackedBody(new TextEncoder().encode("<!DOCTYPE html>"));
  const html = fakeFetch(() => body.stream, AS_HTML);
  await assert.rejects(fetchFace(html.fetch), {
    message: "source sent text/html",
  });
  assert.equal(body.cancelled(), true);
  const none = fakeFetch(() => null, {});
  await assert.rejects(fetchFace(none.fetch), {
    message: "source sent no content type",
  });
});

test("fetchFace refuses a declared length over the limit unread", async () => {
  const body = trackedBody(JPEG);
  const f = fakeFetch(() => body.stream, {
    headers: {
      "content-type": "image/jpeg",
      "content-length": String(MAX_BYTES + 1),
    },
  });
  await assert.rejects(fetchFace(f.fetch), {
    message: `source announced ${MAX_BYTES + 1} bytes`,
  });
  assert.equal(body.cancelled(), true);
});

test("fetchFace stops an endless body at the limit", async () => {
  const body = endlessBody();
  const f = fakeFetch(() => body.stream, AS_JPEG);
  await assert.rejects(fetchFace(f.fetch), {
    message: `source sent over ${MAX_BYTES} bytes`,
  });
  assert.equal(body.cancelled(), true);
});

test("fetchFace refuses a body that only claims to be a JPEG", async () => {
  const html = fakeFetch(() => "<html>", AS_JPEG);
  await assert.rejects(fetchFace(html.fetch), {
    message: "source sent no JPEG",
  });
  const empty = fakeFetch(() => null, AS_JPEG);
  await assert.rejects(fetchFace(empty.fetch), {
    message: "source sent no JPEG",
  });
});

test("resize makes a 512 px square JPEG from a larger square", async () => {
  const out = await resize(await picture(1024, 1024));
  const meta = await sharp(out).metadata();
  assert.deepEqual(
    [meta.format, meta.width, meta.height],
    ["jpeg", SIZE, SIZE],
  );
});

test("resize refuses an oblong image, a small one and no image", async () => {
  await assert.rejects(resize(await picture(1024, 512)), {
    message: "source sent a 1024x512 image",
  });
  await assert.rejects(resize(await picture(300, 300)), {
    message: "source sent a 300x300 image",
  });
  await assert.rejects(resize(await picture(MAX_EDGE + 1, MAX_EDGE + 1)), {
    message: "source sent a 2049x2049 image",
  });
  await assert.rejects(resize(JPEG), { message: /^Input buffer/ });
});

test("resize takes the plain bytes the source's body reads into", async () => {
  const bytes = new Uint8Array(await picture(1024, 1024));
  const meta = await sharp(await resize(bytes)).metadata();
  assert.deepEqual([meta.width, meta.height], [SIZE, SIZE]);
});

test("collectFaces keeps each face once and pauses between requests", async () => {
  // The source repeats a face: 0, 0, 1, 1, 2, ...
  const f = fakeFetch((i) => face(i >> 1), AS_JPEG);
  const { env, sleeps } = fakeEnv(f);
  const got = await collectFaces(env, {
    count: 3,
    maxRequests: 10,
    maxFailures: 2,
    pauseMs: 7,
  });
  assert.deepEqual(got.faces, [face(0), face(1), face(2)]);
  assert.equal(got.requests, 5);
  assert.equal(got.error, null);
  assert.deepEqual(sleeps, [7, 7, 7, 7]);
});

test("collectFaces stops after failures in a row, and a success resets them", async () => {
  // Fails, answers, fails twice: the two in a row end it.
  let n = 0;
  /**
   * Answers the second call with a face and fails the others.
   * @returns {Promise<Response>} the answer
   */
  const flaky = async () => {
    n += 1;
    if (n === 2) return new Response(face(1), AS_JPEG);
    throw new TypeError("fetch failed");
  };
  const { env } = fakeEnv({ fetch: flaky, calls: [] });
  const got = await collectFaces(env, {
    count: 3,
    maxRequests: 10,
    maxFailures: 2,
    pauseMs: 0,
  });
  assert.deepEqual(got.faces, [face(1)]);
  assert.equal(got.requests, 4);
  assert.equal(got.error, "fetch failed");
});

test("collectFaces stops at the request limit and counts a failed resize", async () => {
  const f = fakeFetch(() => face(1), AS_JPEG);
  const { env } = fakeEnv(f);
  const got = await collectFaces(env, {
    count: 3,
    maxRequests: 4,
    maxFailures: 9,
    pauseMs: 0,
  });
  assert.deepEqual(got.faces, [face(1)]);
  assert.equal(got.requests, 4);
  env.resize = async () => {
    throw new Error("source sent a 300x300 image");
  };
  const bad = await collectFaces(env, {
    count: 1,
    maxRequests: 9,
    maxFailures: 2,
    pauseMs: 0,
  });
  assert.deepEqual(
    [bad.faces, bad.requests, bad.error],
    [[], 2, "source sent a 300x300 image"],
  );
});

test("collectFaces stops at the deadline, and no request runs past it", async (t) => {
  const timeout = t.mock.method(AbortSignal, "timeout");
  // One clock for all: a pause moves it by the pause, a request by 4 s.
  let clock = 0;
  const f = fakeFetch((i) => face(i), AS_JPEG);
  const { env } = fakeEnv(f, () => clock);
  /**
   * Moves the clock by the pause.
   * @param {number} ms the pause
   * @returns {Promise<void>} at once
   */
  env.sleep = async (ms) => {
    clock += ms;
  };
  /**
   * Moves the clock by 4 s, then answers as the fake does.
   * @param {string} url the address asked for
   * @param {RequestInit} opts the options passed
   * @returns {Promise<Response>} the answer
   */
  env.fetch = async (url, opts) => {
    clock += 4000;
    return f.fetch(url, opts);
  };
  const got = await collectFaces(env, {
    count: 9,
    maxRequests: 9,
    maxFailures: 9,
    pauseMs: 3000,
    deadlineMs: 25000,
  });
  // Requests start at 0, 7, 14 and 21 s; the one at 21 s gets the 4 s left,
  // not 10, and after the pause to 28 s none starts.
  assert.deepEqual(got.faces, [face(0), face(1), face(2), face(3)]);
  assert.equal(got.requests, 4);
  assert.equal(got.error, "stopped after 25000 ms");
  assert.deepEqual(
    timeout.mock.calls.map((c) => c.arguments[0]),
    [TIMEOUT_MS, TIMEOUT_MS, TIMEOUT_MS, 4000],
  );
});

test("writeFaces writes the faces and their count", async () => {
  const dir = await mkdtemp(join(tmpdir(), "faces-"));
  try {
    const out = join(dir, "faces");
    await writeFaces(out, [face(1), face(2)], defaultEnv());
    assert.deepEqual((await readdir(out)).sort(), [
      "0.jpg",
      "1.jpg",
      "index.json",
    ]);
    assert.deepEqual(
      new Uint8Array(await readFile(join(out, "1.jpg"))),
      face(2),
    );
    assert.equal(
      await readFile(join(out, "index.json"), "utf8"),
      '{"count":2}\n',
    );
  } finally {
    await rm(dir, { recursive: true });
  }
});

test("defaultEnv uses the platform's fetch, clock, image library and files", async (t) => {
  const env = defaultEnv();
  const net = t.mock.method(
    globalThis,
    "fetch",
    async () => new Response(JPEG, AS_JPEG),
  );
  assert.deepEqual(await fetchFace(env.fetch), JPEG);
  assert.equal(net.mock.calls[0].arguments[0], SOURCE);
  assert.equal(await env.sleep(1), undefined);
  assert.ok(Math.abs(env.now() - Date.now()) < 1000);
  assert.equal(env.resize, resize);
  assert.equal(env.dir, DIR);
});

test("storeFaces stores 100 faces and says so", async () => {
  const f = fakeFetch((i) => face(i), AS_JPEG);
  const { env, files, dirs } = fakeEnv(f);
  const { reporter, lines } = fakeReporter();
  await storeFaces({ reporter }, env);
  assert.deepEqual(dirs, ["out/faces"]);
  assert.equal(files.size, COUNT + 1);
  assert.deepEqual(files.get("out/faces/99.jpg"), face(99));
  assert.equal(files.get("out/faces/index.json"), '{"count":100}\n');
  assert.deepEqual(lines, [
    "info: Stored 100 faces in out/faces (100 requests)",
  ]);
});

test("storeFaces warns when the source fails, and stores none", async () => {
  const { env, files } = fakeEnv({
    /**
     * A fetch whose network is down.
     * @returns {Promise<Response>} rejects as fetch does
     */
    fetch: async () => {
      throw new TypeError("fetch failed");
    },
    calls: [],
  });
  const { reporter, lines } = fakeReporter();
  await storeFaces({ reporter }, env);
  assert.equal(files.get("out/faces/index.json"), '{"count":0}\n');
  assert.deepEqual(lines, [
    `warn: Stored 0 faces in out/faces (${MAX_FAILURES} requests), fewer than 100; last error: fetch failed`,
  ]);
});

test("storeFaces warns without an error when the source repeats itself", async () => {
  const { env } = fakeEnv(fakeFetch(() => face(1), AS_JPEG));
  const { reporter, lines } = fakeReporter();
  await storeFaces({ reporter }, env);
  assert.deepEqual(lines, [
    `warn: Stored 1 faces in out/faces (${MAX_REQUESTS} requests), fewer than 100`,
  ]);
});

test("onPostBuild stores into public/faces with the real environment", async (t) => {
  // Gatsby hands a callback to a hook of three parameters; this one takes one.
  assert.equal(onPostBuild.length, 1);
  const dir = await mkdtemp(join(tmpdir(), "faces-"));
  const cwd = process.cwd();
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("fetch failed");
  });
  try {
    process.chdir(dir);
    const { reporter, lines } = fakeReporter();
    await onPostBuild({ reporter });
    assert.equal(
      await readFile(join(dir, DIR, "index.json"), "utf8"),
      '{"count":0}\n',
    );
    assert.deepEqual(lines, [
      `warn: Stored 0 faces in ${DIR} (${MAX_FAILURES} requests), fewer than 100; last error: fetch failed`,
    ]);
  } finally {
    process.chdir(cwd);
    await rm(dir, { recursive: true });
  }
});

test("gatsby-node.mjs hands Gatsby this hook", () => {
  assert.equal(gatsbyNode.onPostBuild, onPostBuild);
});
