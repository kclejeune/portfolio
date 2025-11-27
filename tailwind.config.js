import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
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
