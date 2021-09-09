const colors = require("tailwindcss/colors");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "media",
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue,
      neutral: colors.coolGray,
    },
  },
  plugins: [],
};

module.exports = config;
