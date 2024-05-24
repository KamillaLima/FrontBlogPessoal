/** @type {import('tailwindcss').Config} */
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
      }


    },
    screens: {
      'cp': { 'min': '320px', 'max': '640px' },
      'sm' : {'min' : '640px' , 'max' : '768px'},
      'md' : {'min' : '768px' , 'max' : '1024px'},
      'lg' : {'min' : '1024px' , 'max' : '1280px'},
      'xl' : {'min' : '1280px' , 'max' : '1536px'},
      '2xl' : {'min' : '1536px' , }
    }

  },
  plugins: [],
}
