/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#9980FA",
        secondary: "#FFA500",
        active: "#2ecc71",
        process: "#1f75f6",
      },
      fontFamily: {
        poppins: ["poppins", "Arial"],
      },
      backgroundImage: {
        "hero-texture": "url('/images/hero.png')",
      },
      keyframes: {
        display: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        display: "display .1s ease-in-out alternate",
      },
      dropShadow: {
        primary: "0px 1px 1px #9980FA",
      },
    },
  },
  plugins: [],
};
