/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  // purge: [],
  theme: {
    extend: {
      colors: {
        customYellow: "#FFC108",
        customBlack: "#18181A",
        customGray: "#72737A",
        customRed: "#B1060F",
      },
    },
  },
  // variants: {},
  plugins: [],
};
