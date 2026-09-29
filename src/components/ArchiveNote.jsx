/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * The archive note of the pages whose content was time-bound: Schedule,
 * Hacker Manual, Venue, Experiences and Art (design review, issue 18).
 *
 * @module components/ArchiveNote
 */

import React from "react";

/**
 * Says that ETHBerlin04 is over and the page may be out of date.
 *
 * @returns {React.ReactElement} The note, a paragraph with `role="note"`.
 */
const ArchiveNote = () => (
  <p
    role="note"
    className="inline-block font-ocra text-[13px] leading-[18px] border border-black px-2.5 py-1.5 mb-6"
  >
    ARCHIVE · ETHBerlin04 took place May 24–26, 2024. Details on this page may
    be out of date.
  </p>
);

export default ArchiveNote;
