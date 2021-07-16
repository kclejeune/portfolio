const colors = require("tailwindcss/colors");

module.exports = {
  mode: 'jit',
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ['./public/index.html', './src/**/*.{svelte,ts,js}'],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: colors.blue,
      neutral: colors.coolGray,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
