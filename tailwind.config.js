/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorBlue: "#183DFF",
        colorRed: "#FC0D1B",
        colorBlack: "#25241F",
        colorGray: "#393838",
        colorOrange: "#FF4200",
        colorGreen: "#2e8d36",
        colorYellow: "#FFC444",
        colorGrayBlack: "#363434",
        colorGrayWhite: "#524F4F",
      },
    },
  },
  plugins: [],
}