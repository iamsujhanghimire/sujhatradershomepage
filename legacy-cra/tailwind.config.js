/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {},
    fontFamily: {
      titleFont: ["Playfair Display SC", "sans-serif"],
      subtitleFont: ["Poppins", "sans-serif"],
      bodyFont: ["Source Sans Pro", "sans-serif"],
    },
    colors: {
      Primary: "#322747",
      Accent1: "#9a89be",
      Secondary: "#8bac3a",
      Accent2: "#a7c06a",
      Black: "#000000",
      DarkGray: "#9d9d9d",
      LightGray: "#d9d9d9",
      PrimaryBg: "#fafafa",
      White: "#ffffff",
      Success: "#46d53a",
      Error: "#ed3636",
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke"),
    require("tailwind-scrollbar-hide"),
  ],
};
