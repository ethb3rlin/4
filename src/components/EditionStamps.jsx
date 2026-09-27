/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * Entry stamps linking the previous ETHBerlin editions, shown in the homepage
 * passport box: option 2a of the design "ETHBerlin previous editions
 * backlinks". Shapes, places and inks live in `styles/stamps.css`; every name,
 * date, title, label and link comes from `data/editions`.
 *
 * @module components/EditionStamps
 */

/** @import { Edition } from "../data/editions.mjs" */

import React from "react";
import {
  editions,
  editionUrl,
  stampDate,
  stampLabel,
  stampName,
  stampTitle,
  stampWords,
} from "../data/editions.mjs";
import "../styles/stamps.css";

/**
 * One stamp: a link to an edition's site that opens in a new tab. The link
 * holds place, tilt and opacity; its inner `stamp-ink` element holds border,
 * text and the worn-ink mask.
 *
 * @param {object} props Component props.
 * @param {Edition} props.edition The edition the stamp links to.
 * @param {string} props.variant Class that picks the stamp's shape and place.
 * @param {React.ReactNode} props.children The stamp's lines.
 * @returns {React.ReactElement} The stamp link.
 */
const Stamp = ({ edition, variant, children }) => (
  <a
    href={editionUrl(edition)}
    target="_blank"
    rel="noreferrer"
    title={stampTitle(edition)}
    aria-label={stampLabel(edition)}
    className={`stamp ${variant}`}
  >
    <span className="stamp-ink">{children}</span>
  </a>
);

/**
 * The "Previous editions" block: a label, then a stamp field with one stamp
 * per edition, newest first, left to right and top to bottom.
 *
 * @returns {React.ReactElement} The label and the stamp field.
 */
const EditionStamps = () => {
  const [third, zwei, first] = editions;
  const [zweiName, zweiWord] = stampWords(zwei);
  return (
    <div className="mt-6">
      <p className="font-ocra my-0">Previous editions:</p>
      <div className="edition-stamps font-ocra">
        <Stamp edition={third} variant="stamp-third">
          <span className="stamp-name">{stampName(third)}</span>
          <span className="stamp-rule" />
          <span className="stamp-date">{stampDate(third)}</span>
        </Stamp>
        <Stamp edition={zwei} variant="stamp-zwei">
          <span className="stamp-ring" />
          <span className="stamp-name">{zweiName}</span>
          <span className="stamp-word">{zweiWord}</span>
          <span className="stamp-date">{stampDate(zwei)}</span>
        </Stamp>
        <Stamp edition={first} variant="stamp-first">
          <span className="stamp-ring" />
          <span className="stamp-name">{stampName(first)}</span>
          <span className="stamp-date">{stampDate(first)}</span>
        </Stamp>
      </div>
    </div>
  );
};

export default EditionStamps;
