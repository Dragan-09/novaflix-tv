/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#1f75f6',
      'gray': '#9B9B9B',
      'white': '#ffffff'
    },
    fontFamily: {
      'poppins': ['poppins', 'Arial']
    },
    backgroundImage: {
      'hero-texture': "url('/public/images/hero.png')",
    },
    extend: {},
  },
  plugins: [],
}

