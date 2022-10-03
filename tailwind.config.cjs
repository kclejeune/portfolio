const colors = require("tailwindcss/colors");

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@brainandbones/skeleton/tailwind/theme.cjs"),
  ],
};

module.exports = config;
