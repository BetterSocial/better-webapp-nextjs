/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'post': '1rem'
      },
      lineHeight: {
        'post': '1.5rem'
      },
      letterSpacing: {
        'post': '0.01rem'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif']
      },
      colors: {
        gray06: '#828282',
        grayIcon: '#C4C4C4',
        primaryBlue: '#2f80ed',
        humanId_blue: '#023B60'
      },
      boxShadow: {
        '3xl': '-1.5px 3px 3px 0px rgba(0, 0, 0, 0.50);'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
