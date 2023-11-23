/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2ecc71',
        secondary: '#e67e22',
        active: '#2ecc71',
        process: '#1f75f6'
      },
      fontFamily: {
        poppins: ['poppins', 'Arial']
      },
      backgroundImage: {
        'hero-texture': "url('/images/hero.png')",
      },
      keyframes: {
        display: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'}
        }
      },
      animation: {
        display: 'display .1s ease-in-out alternate'
      }
    },
  },
  plugins: [],
}

