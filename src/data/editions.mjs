/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * The ETHBerlin editions before ETHBerlin04, and every string their entry
 * stamps show or announce. Each edition's facts are written here once; the
 * stamps' lines, titles, labels and links are made from them.
 *
 * @module data/editions
 */

/**
 * One previous edition of ETHBerlin.
 *
 * @typedef {object} Edition
 * @property {string} name Edition name, as the edition's own site writes it.
 * @property {string} host Host name of the edition's site.
 * @property {string} firstDay First day, as ISO 8601 `YYYY-MM-DD`.
 * @property {string} lastDay Last day, as ISO 8601 `YYYY-MM-DD`, in the same
 *   month as `firstDay`.
 */

/**
 * The previous editions, newest first. The days come from each edition's own
 * repository: `ethb3rlin/3`, `ethb3rlin/2` (the hackathon, not the DAPPCON19
 * conference before it) and `ethb3rlin/1`.
 *
 * @type {ReadonlyArray<Edition>}
 */
export const editions = Object.freeze([
  {
    name: "ETHBerlin³",
    host: "2022.ethberlin.org",
    firstDay: "2022-09-16",
    lastDay: "2022-09-18",
  },
  {
    name: "ETHBerlin ZWEI",
    host: "2019.ethberlin.org",
    firstDay: "2019-08-23",
    lastDay: "2019-08-25",
  },
  {
    name: "ETHBerlin",
    host: "2018.ethberlin.org",
    firstDay: "2018-09-07",
    lastDay: "2018-09-09",
  },
]);

/**
 * English month names, January first.
 *
 * @type {ReadonlyArray<string>}
 */
const MONTHS = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

/**
 * Splits an ISO 8601 date into its parts. The date is never turned into a
 * `Date`, so no time zone can shift the day.
 *
 * @param {string} iso A date as `YYYY-MM-DD`.
 * @returns {{year: number, month: string, day: number}} The year, the English
 *   month name and the day of the month.
 */
function dateParts(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month: MONTHS[month - 1], day };
}

/**
 * An edition's days in words, for example `September 16-18, 2022`.
 *
 * @param {Edition} edition A previous edition.
 * @param {string} separator Text between the first and the last day.
 * @returns {string} Month, first day, separator, last day and year.
 */
function dayRange(edition, separator) {
  const first = dateParts(edition.firstDay);
  const last = dateParts(edition.lastDay);
  return `${first.month} ${first.day}${separator}${last.day}, ${first.year}`;
}

/**
 * A stamp's name line: the edition name in capitals.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string} For example `ETHBERLIN³`.
 */
export function stampName(edition) {
  return edition.name.toUpperCase();
}

/**
 * The words of a stamp's name line, for stamps that set them on separate
 * lines.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string[]} For example `["ETHBERLIN", "ZWEI"]`.
 */
export function stampWords(edition) {
  return stampName(edition).split(" ");
}

/**
 * A stamp's date line: the first day as `DD MON YYYY`.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string} For example `07 SEP 2018`.
 */
export function stampDate(edition) {
  const { year, month, day } = dateParts(edition.firstDay);
  const dd = String(day).padStart(2, "0");
  return `${dd} ${month.slice(0, 3).toUpperCase()} ${year}`;
}

/**
 * A stamp's `title`: the edition name and its days.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string} For example `ETHBerlin³ · September 16-18, 2022`.
 */
export function stampTitle(edition) {
  return `${edition.name} · ${dayRange(edition, "-")}`;
}

/**
 * A stamp's `aria-label`: the edition name, its days and the site the link
 * opens.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string} For example
 *   `ETHBerlin³, September 16 to 18, 2022, opens 2022.ethberlin.org`.
 */
export function stampLabel(edition) {
  return `${edition.name}, ${dayRange(edition, " to ")}, opens ${edition.host}`;
}

/**
 * A stamp's link target: the edition's site.
 *
 * @param {Edition} edition A previous edition.
 * @returns {string} For example `https://2022.ethberlin.org`.
 */
export function editionUrl(edition) {
  return `https://${edition.host}`;
}
