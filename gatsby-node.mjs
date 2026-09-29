/*
 * SPDX-FileCopyrightText: 2026 Department of Decentralization
 * SPDX-License-Identifier: Unlicense
 *
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <https://unlicense.org>
 */

/**
 * Gatsby's build hooks for the site: after a build, the face pool of RANDOM
 * FACE (`src/build/faces.mjs`).
 * @module gatsby-node
 */

export { onPostBuild } from "./src/build/faces.mjs";
