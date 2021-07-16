# kclejeune.github.io

This is my personal website. It's written with very basic SvelteJS, TypeScript, and styled with Tailwind CSS.
It's essentially just a live hosted resume and dynamically updating view of my pinned github repositories.

## Development

Clone the repository and install the dependencies with

```bash
cd kclejeune.github.io
npm install
```

Next, start [Rollup](https://rollupjs.org) (the dev server) with

```bash
npm run dev
```

The site should be running on [localhost:5000](http://localhost:5000), or will specify an alternate location upon starting the server.

## Building and running in production mode

To create an optimized version of the app, run

```bash
npm run build
```

This includes a compiled version of all Svelte components and their respective javascript,
in addition to a bundle of pruned Tailwind CSS classes.

To run the optimized app, run

```bash
npm run start
```

This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to GitHub Pages

Technically, this should probably run on an actual server.
I'm too cheap for that, so instead we'll bundle this as a static
site. We accomplish this by tracking the [./public](./public) directory
(which is ignored by default) and pushing it as a subtree to
the `gh-pages` branch with `git subtree push --prefix public origin gh-pages`.

This branch is automatically deployed via GitHub Pages
to kclj.io on every push.

To do this, run a fresh build and commit it:

```bash
npm run build
git commit -am "build the app"
```

and finally run

```bash
npm run deploy
```

Results will be visible at your github pages URL in a few minutes.
