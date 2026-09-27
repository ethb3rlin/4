/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * Unit tests for `editions.mjs`: the facts, and every string the entry stamps
 * show or announce. Run with `npm test`.
 *
 * @module data/editions.test
 */

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  editions,
  editionUrl,
  stampDate,
  stampLabel,
  stampName,
  stampTitle,
  stampWords,
} from "./editions.mjs";

test("links the three previous editions, newest first", () => {
  assert.deepEqual(editions.map(editionUrl), [
    "https://2022.ethberlin.org",
    "https://2019.ethberlin.org",
    "https://2018.ethberlin.org",
  ]);
  assert.ok(Object.isFrozen(editions));
});

test("name lines are the edition names in capitals", () => {
  assert.deepEqual(editions.map(stampName), [
    "ETHBERLIN³",
    "ETHBERLIN ZWEI",
    "ETHBERLIN",
  ]);
  assert.deepEqual(editions.map(stampWords), [
    ["ETHBERLIN³"],
    ["ETHBERLIN", "ZWEI"],
    ["ETHBERLIN"],
  ]);
});

test("date lines show the first day as DD MON YYYY", () => {
  assert.deepEqual(editions.map(stampDate), [
    "16 SEP 2022",
    "23 AUG 2019",
    "07 SEP 2018",
  ]);
});

test("titles name the edition and its days", () => {
  assert.deepEqual(editions.map(stampTitle), [
    "ETHBerlin³ · September 16-18, 2022",
    "ETHBerlin ZWEI · August 23-25, 2019",
    "ETHBerlin · September 7-9, 2018",
  ]);
});

test("labels name the edition, its days and the site they open", () => {
  assert.deepEqual(editions.map(stampLabel), [
    "ETHBerlin³, September 16 to 18, 2022, opens 2022.ethberlin.org",
    "ETHBerlin ZWEI, August 23 to 25, 2019, opens 2019.ethberlin.org",
    "ETHBerlin, September 7 to 9, 2018, opens 2018.ethberlin.org",
  ]);
});

test("every edition ends after it starts, in the same month", () => {
  for (const { firstDay, lastDay } of editions) {
    assert.match(firstDay, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(lastDay, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(firstDay.slice(0, 7), lastDay.slice(0, 7));
    assert.ok(firstDay < lastDay);
  }
});

test("helpers work for any edition", () => {
  const edition = {
    name: "Test Edition",
    host: "test.example",
    firstDay: "2030-01-02",
    lastDay: "2030-01-05",
  };
  assert.equal(stampName(edition), "TEST EDITION");
  assert.deepEqual(stampWords(edition), ["TEST", "EDITION"]);
  assert.equal(stampDate(edition), "02 JAN 2030");
  assert.equal(stampTitle(edition), "Test Edition · January 2-5, 2030");
  assert.equal(
    stampLabel(edition),
    "Test Edition, January 2 to 5, 2030, opens test.example",
  );
  assert.equal(editionUrl(edition), "https://test.example");
});
