/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * The chip that opens a room on the venue map, used by Schedule, Experiences,
 * Hacker Manual and Art (design review, issue 41).
 *
 * @module components/LocationButton
 */

import React from "react";

/**
 * A button that shows its room's name beside a location icon. Its name read
 * out is "Show <room> on the venue map"; the icon is hidden from assistive
 * tech.
 *
 * @param {object} props The component's props.
 * @param {{ name: string, handler: function(): void }} props.loc The room, as the
 *   chip shows it, and the handler that opens the map dialog on it.
 * @returns {React.ReactElement} The button.
 */
const LocationButton = ({ loc }) => (
  <button
    type="button"
    onClick={loc.handler}
    aria-label={`Show ${loc.name} on the venue map`}
    className="inline-flex items-center gap-1 min-h-[32px] px-2.5 py-1 ml-1 align-middle border border-[rgba(0,0,0,0.35)] hover:border-black bg-white text-sm text-berlin-red-text font-normal"
  >
    <span
      aria-hidden="true"
      className="material-symbols-outlined !text-base !leading-none"
    >
      my_location
    </span>
    {loc.name}
  </button>
);

export default LocationButton;
