/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640p",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        chakra: ["Chakra Petch", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#fd6000",
        "primary-light": "#fff",
        "primary-dark": "#6a6a6a",
        secondary: "#e3e3e3",
        dark: "#ffd000",
      },
    },
  },
  plugins: [],
};
