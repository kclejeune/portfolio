const colors = require("tailwindcss/colors");

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        neutral: colors.gray,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@brainandbones/skeleton/tailwind/theme.cjs"),
  ],
};

module.exports = config;
