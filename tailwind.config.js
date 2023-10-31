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
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        gray06: '#828282',
        grayIcon: '#C4C4C4',
        primaryBlue: '#2f80ed'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
