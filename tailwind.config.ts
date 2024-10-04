/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        charade: {
          "50": "#f6f7f9",
          "100": "#ecedf2",
          "200": "#d5d7e2",
          "300": "#b1b7c8",
          "400": "#8790a9",
          "500": "#68728f", // Primary color (charade)
          "600": "#535a76",
          "700": "#444a60",
          "800": "#3b3f51",
          "900": "#343746",
          "950": "#262833",
        },
        accent: {
          DEFAULT: "#47e194", // Accent color (aquamarine)
        },
      },
    },
  },
  darkMode: "class", // Enable dark mode based on a class
  plugins: [],
};
