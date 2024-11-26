/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorOragen:'#FF4200',
        colorGray: '#393838',
        colorGreen: '#2e8c36',
        colorBlue: '#183DFF',
        colorRed: '#fc0d18',
        colorYellow: '#ffc444',
        colorGrayLight: '#f6f3f3',
        colorWhiteShadow: '#cac9c9',
        colorExportsGreen: '#1d9d22',
        colorMsjYellow: '#fbc609',
        borderCardUser: '#d9d9d9',
        colorCardUser: '#f5f3f3'
      },
    },
  },
  plugins: [],
}