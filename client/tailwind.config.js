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
        'primary': '#2ecc71',
        'secondary': '#e67e22',
      },
      fontFamily: {
        'poppins': ['poppins', 'Arial']
      },
      backgroundImage: {
        'hero-texture': "url('/images/hero.png')",
      },
    },
  },
  plugins: [],
}

