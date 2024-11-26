/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorGray: '#393838',
        colorGreen: '#2e8c36',
        colorBlue: '#183DFF'
      },
    },
  },
  plugins: [],
}