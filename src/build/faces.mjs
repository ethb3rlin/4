/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * The face pool behind RANDOM FACE on `/face-idont/`: after each build, up to
 * 100 distinct faces from thispersondoesnotexist.com, resized to 512 px, in
 * `public/faces/` as `0.jpg` to `99.jpg`, with an `index.json` that holds
 * their count.
 *
 * The source sends no CORS header, so the page cannot read its faces itself;
 * the build fetches them and the site serves them from its own origin. The
 * source's `/random-person.jpeg` answers a new face about every 0.25 s, so the
 * build asks one at a time and keeps each face once. A build that cannot
 * reach the source stores what it got, with a warning, and never fails.
 * @module build/faces
 */

import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";
import sharp from "sharp";

/** Where the faces come from: a freshly generated 1024 x 1024 JPEG. */
export const SOURCE = "https://thispersondoesnotexist.com/random-person.jpeg";

/** How many faces a build stores. */
export const COUNT = 100;

/** The edge of a stored face, in pixels: about 31 KB at `QUALITY`. */
export const SIZE = 512;

/** The JPEG quality of a stored face. */
export const QUALITY = 80;

/** The pause between two requests, in milliseconds. */
export const PAUSE_MS = 250;

/** How long one request may take, body included, in milliseconds. */
export const TIMEOUT_MS = 10000;

/** The largest source image read, in bytes (the source sends about 530 KB). */
export const MAX_BYTES = 5 * 1024 * 1024;

/** The most requests a build makes. */
export const MAX_REQUESTS = 500;

/** How many failed requests in a row end the collection. */
export const MAX_FAILURES = 5;

/** Where the faces go, from the site's root. */
export const DIR = "public/faces";

/**
 * A fetch: the platform's, or a fake in the tests.
 * @typedef {function(string, RequestInit): Promise<Response>} Fetch
 */

/**
 * What the collection and the writing use; the tests pass fakes.
 * @typedef {object} Env
 * @property {Fetch} fetch fetches from the source
 * @property {function(number): Promise<unknown>} sleep waits that many ms
 * @property {function(Uint8Array): Promise<Uint8Array>} resize turns a source
 *   image into a stored face
 * @property {function(string, {recursive: boolean}): Promise<unknown>} mkdir
 *   creates the folder
 * @property {function(string, (string|Uint8Array)): Promise<void>} writeFile
 *   writes one file
 * @property {string} dir where the faces go
 */

/**
 * The limits of a collection; each one left out is the module's constant.
 * @typedef {object} Limits
 * @property {number} [count] how many faces to collect (`COUNT`)
 * @property {number} [maxRequests] the most requests (`MAX_REQUESTS`)
 * @property {number} [maxFailures] how many failures in a row end it
 *   (`MAX_FAILURES`)
 * @property {number} [pauseMs] the pause between requests (`PAUSE_MS`)
 */

/**
 * What a collection brings back.
 * @typedef {object} Collection
 * @property {Array<Uint8Array>} faces the stored faces, each once
 * @property {number} requests how many requests it took
 * @property {(string|null)} error the last failure, if any
 */

/**
 * The parts of Gatsby's reporter the build hook uses.
 * @typedef {object} Reporter
 * @property {function(string): void} info logs a line
 * @property {function(string): void} warn logs a warning
 */

/**
 * Whether the bytes start as a JPEG file does (FF D8 FF).
 * @param {Uint8Array} bytes the body the source sent
 * @returns {boolean} true for a JPEG
 */
export const isJpeg = (bytes) =>
  bytes.length > 3 &&
  bytes[0] === 0xff &&
  bytes[1] === 0xd8 &&
  bytes[2] === 0xff;

/**
 * Reads a body, but no more than `limit` bytes of it.
 * @param {(ReadableStream<Uint8Array>|null)} body the body to read
 * @param {number} limit the most bytes to accept
 * @returns {Promise<Uint8Array>} the bytes read; none for no body
 * @throws {Error} when the body runs past the limit; the rest is cancelled
 */
export const readLimited = async (body, limit) => {
  if (!body) return new Uint8Array(0);
  const reader = body.getReader();
  /** @type {Array<Uint8Array>} */
  const chunks = [];
  let size = 0;
  let chunk = await reader.read();
  while (!chunk.done) {
    size += chunk.value.length;
    if (size > limit) {
      await reader.cancel();
      throw new Error(`source sent over ${limit} bytes`);
    }
    chunks.push(chunk.value);
    chunk = await reader.read();
  }
  const bytes = new Uint8Array(size);
  let at = 0;
  for (const part of chunks) {
    bytes.set(part, at);
    at += part.length;
  }
  return bytes;
};

/**
 * Drops a body the build will not read, which frees the connection.
 * @param {Response} res the answer whose body to drop
 * @returns {Promise<void>} once the body is cancelled
 */
const discard = async (res) => {
  if (res.body) await res.body.cancel();
};

/**
 * Fetches one image from the source and checks that it is a JPEG.
 * @param {Fetch} fetchImpl the fetch to use
 * @param {number} [timeoutMs] how long to wait, body included; `TIMEOUT_MS`
 *   unless a test passes less
 * @returns {Promise<Uint8Array>} the JPEG's bytes
 * @throws {Error} when the source fails, times out, or sends anything but a
 *   JPEG within `MAX_BYTES`
 */
export const fetchFace = async (fetchImpl, timeoutMs = TIMEOUT_MS) => {
  const res = await fetchImpl(SOURCE, {
    headers: { accept: "image/jpeg" },
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) {
    await discard(res);
    throw new Error(`source answered ${res.status}`);
  }
  // The type decides before the body is read: the front page is HTML.
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/jpeg")) {
    await discard(res);
    throw new Error(`source sent ${type || "no content type"}`);
  }
  // A declared length over the limit ends it before the body is read.
  const length = Number(res.headers.get("content-length"));
  if (length > MAX_BYTES) {
    await discard(res);
    throw new Error(`source announced ${length} bytes`);
  }
  const bytes = await readLimited(res.body, MAX_BYTES);
  if (!isJpeg(bytes)) throw new Error("source sent no JPEG");
  return bytes;
};

/**
 * Turns a source image into a stored face: a `SIZE` square JPEG.
 * @param {Uint8Array} bytes the source image
 * @returns {Promise<Uint8Array>} the stored face
 * @throws {Error} when the image is no square of at least `SIZE` pixels, or
 *   no image at all
 */
export const resize = async (bytes) => {
  const image = sharp(bytes);
  const { width, height } = await image.metadata();
  if (!width || width !== height || width < SIZE) {
    throw new Error(`source sent a ${width}x${height} image`);
  }
  return image
    .resize(SIZE, SIZE)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
};

/**
 * Asks the source for faces, one request at a time, until `count` distinct
 * ones are in, `maxRequests` are made, or `maxFailures` fail in a row. A face
 * seen before is skipped.
 * @param {Env} env the fetch, the pause and the resize to use
 * @param {Limits} [limits] the limits; the module's constants unless a test
 *   passes smaller ones
 * @returns {Promise<Collection>} the faces, the requests made, the last error
 */
export const collectFaces = async (
  env,
  {
    count = COUNT,
    maxRequests = MAX_REQUESTS,
    maxFailures = MAX_FAILURES,
    pauseMs = PAUSE_MS,
  } = {},
) => {
  const seen = new Set();
  /** @type {Array<Uint8Array>} */
  const faces = [];
  /** @type {(string|null)} */
  let error = null;
  let failures = 0;
  let requests = 0;
  while (
    faces.length < count &&
    requests < maxRequests &&
    failures < maxFailures
  ) {
    if (requests > 0) await env.sleep(pauseMs);
    requests += 1;
    try {
      const bytes = await fetchFace(env.fetch);
      const key = createHash("sha256").update(bytes).digest("hex");
      // A face counts as seen once it is stored: an image that fails to
      // resize fails again when the source repeats it.
      if (!seen.has(key)) {
        faces.push(await env.resize(bytes));
        seen.add(key);
      }
      failures = 0;
    } catch (e) {
      failures += 1;
      error = /** @type {Error} */ (e).message;
    }
  }
  return { faces, requests, error };
};

/**
 * Writes the faces as `0.jpg`, `1.jpg` and on, and `index.json` with their
 * count, into the folder.
 * @param {string} dir the folder
 * @param {Array<Uint8Array>} faces the faces to write
 * @param {Env} env the folder and file writers to use
 * @returns {Promise<void>} once every file is written
 */
export const writeFaces = async (dir, faces, env) => {
  await env.mkdir(dir, { recursive: true });
  for (const [i, face] of faces.entries()) {
    await env.writeFile(`${dir}/${i}.jpg`, face);
  }
  await env.writeFile(
    `${dir}/index.json`,
    `${JSON.stringify({ count: faces.length })}\n`,
  );
};

/**
 * The real network, clock, image library and file system, with `DIR`.
 * @returns {Env} what the build uses
 */
export const defaultEnv = () => ({
  /**
   * The platform's fetch, looked up on each call, so that a test can stand
   * in for the network.
   * @param {string} url the address
   * @param {RequestInit} init the options
   * @returns {Promise<Response>} the answer
   */
  fetch: (url, init) => globalThis.fetch(url, init),
  sleep,
  resize,
  mkdir,
  writeFile,
  dir: DIR,
});

/**
 * Gatsby's hook after a build: stores the face pool and reports how it went.
 * Fewer than `COUNT` faces is a warning, never an error.
 * @param {{reporter: Reporter}} args what Gatsby passes
 * @param {object} [_options] the site's plugin options, unused
 * @param {Env} [env] the real ones unless a test passes fakes
 * @returns {Promise<void>} once the faces are stored
 */
export const onPostBuild = async (
  { reporter },
  _options,
  env = defaultEnv(),
) => {
  const { faces, requests, error } = await collectFaces(env);
  await writeFaces(env.dir, faces, env);
  const line = `Stored ${faces.length} faces in ${env.dir} (${requests} requests)`;
  if (faces.length < COUNT) {
    reporter.warn(
      `${line}, fewer than ${COUNT}${error ? `; last error: ${error}` : ""}`,
    );
  } else {
    reporter.info(line);
  }
};
