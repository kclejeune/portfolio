const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        neutral: colors.gray,
      },
    },
  },
  plugins: [typography],
};

module.exports = config;
