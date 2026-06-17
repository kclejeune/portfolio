# Portfolio

[![CI](https://github.com/kclejeune/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/kclejeune/portfolio/actions/workflows/ci.yml)

Personal site built with SvelteKit, deployed to Cloudflare Workers. The
Projects and Skills pages pull live data from the GitHub GraphQL API
(pinned repos, language footprint, contribution activity) with KV caching.

## Stack

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Build:** Vite 8 (Rolldown bundler)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite`
- **Linting:** ESLint 9 (flat config) + `eslint-plugin-svelte`
- **Formatting:** [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)
- **Tests:** Vitest
- **Deploy:** `@sveltejs/adapter-cloudflare`

## Developing

Install dependencies with `pnpm install`, then start a dev server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev --open
```

The GitHub-backed pages need a token to fetch live data. Provide a
`GITHUB_API_KEY` with `read:user`/`public_repo` scope via the environment
(the rest of the GitHub config lives in `.env`):

```bash
GITHUB_API_KEY="<token>" pnpm dev
```

## Scripts

| Command        | Description                                |
| -------------- | ------------------------------------------ |
| `pnpm dev`     | Start the dev server                       |
| `pnpm build`   | Type-check and build for production        |
| `pnpm preview` | Preview the production build               |
| `pnpm check`   | Run `svelte-check`                         |
| `pnpm lint`    | Check formatting (oxfmt) and lint (ESLint) |
| `pnpm format`  | Format the codebase with oxfmt             |
| `pnpm test`    | Run the Vitest suite                       |
| `pnpm upgrade` | Update dependencies via npm-check-updates  |

## Building

```bash
pnpm build
```

Preview the production build with `pnpm preview`.
