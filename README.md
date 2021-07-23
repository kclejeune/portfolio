# Portfolio

[![CI](https://github.com/kclejeune/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/kclejeune/portfolio/actions/workflows/ci.yml)

Basic personal site written with SvelteKit as an overpowered static site generator.
SvelteKit allows for development and page rendering in JavaScript, but remains compatible with non-js browsers.

## Developing

Install dependencies with `npm install`. To preview the site, run

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment.
As mentioned previously, this project uses adapter-static.

To build and deploy, run

```bash
npm run build
```

and copy the `build/` output folder to any static web server.

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
