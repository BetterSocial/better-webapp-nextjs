/** @type {import('tailwindcss').Config} */

const almostBlack = '#16202A'
const grey100 = '#F5F6F7'
const grey210 = '#1E3343'
const grey410 = '#8C939F'
const primaryIncognito = '#00ABB2'

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
    "./feature/**/*.{js,ts,jsx,tsx}",
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
        almostBlack: almostBlack,
        gray02: '#E0E0E0',
        gray05: '#F5F5F5',
        gray06: '#828282',
        grayIcon: '#C4C4C4',
        grey100: grey100,
        grey210: grey210,
        grey410: grey410,
        foundationBlue: '#0D5AA0',
        primaryBlue: '#2f80ed',
        primaryIncognito: primaryIncognito,
        humanId_blue: '#023B60',
        cyan: '#00ADB5',
        cyan10: '#00ADD5',
        signedPrimary: '#5CB9FF'
      },
      boxShadow: {
        '3xl': '-1.5px 3px 3px 0px rgba(0, 0, 0, 0.50);'
      },
      maxWidth: {
        'M': '375px'
      },
      flex: {
        '1-0-0': '1 0 0%',
      },
      screens: {
        'sm': {
          max: '430px'
        }
      }
    },
  },
  plugins: [],
}
