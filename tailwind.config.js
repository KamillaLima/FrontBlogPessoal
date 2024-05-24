/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#d87f62',
        'pink': '#e39cc3',
        'brown': '#8d4b42',
        'purple': '#8e86bd',
        'violet': '#a49ccc',
        'white': '#ffffff',
        'transparent': 'transparent',
        'black': '#000000'
      }


    },
    screens: {
      'cellphone': { 'min': '320px', 'max': '768px' },
      ...defaultTheme.screens
    }

  },
  plugins: [],
}
