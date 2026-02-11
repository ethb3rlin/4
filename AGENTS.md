# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Gatsby page entry points (route-level React components).
- `src/components/`: Reusable React components.
- `src/styles/`: Global styles; `gatsby-browser.js` imports `src/styles/global.css`.
- `src/assets/`: Fonts, icons, and static assets referenced by the UI.
- `src/images/`: Image sources used by Gatsby image pipeline.
- `static/`: Files copied verbatim to the site root at build time.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run develop` or `npm run start`: Run local dev server at the Gatsby default port.
- `npm run build`: Build the production site into `build/`.
- `npm run serve`: Serve the production build locally.
- `npm run clean`: Clear Gatsby caches and build artifacts.
- `npm run deploy`: Publish `build/` to GitHub Pages (writes `build/CNAME`).

## Coding Style & Naming Conventions
- JavaScript/JSX with Gatsby and React. Keep components small and page-level logic in `src/pages/`.
- Tailwind CSS is configured in `tailwind.config.js`; prefer utility classes over ad-hoc CSS.
- Fonts and custom colors are defined in Tailwind theme extensions; reuse tokens like `berlin-yellow` and `berlin-red`.
- Use 2-space indentation (match existing files). Component and file names are `camelCase` or `PascalCase` as already used in `src/`.

## Testing Guidelines
- No test runner is configured in `package.json` for this Gatsby build.
- If you add tests, document the framework and command here and keep test files near related components (e.g., `src/components/__tests__/`).

## Commit & Pull Request Guidelines
- Commit messages in history are short and imperative (e.g., “Add photos”, “Fix debug”). Follow that style.
- Keep commits focused on a single change area.
- PRs should include a brief summary and note any UI-impacting changes. Include screenshots or short clips for visual updates.

## Configuration & Content Notes
- Site metadata and Gatsby plugins live in `gatsby-config.js`.
- Static HTML shell is in `src/html.js` if you need to tweak the document structure.
