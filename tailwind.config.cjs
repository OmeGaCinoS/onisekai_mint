/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-white": "hsl(var(--light-white) / <alpha-value>)",
        "brand-gray": "hsl(var(--brand-gray) / <alpha-value>)",
        "accent-red": "hsl(var(--accent-red) / <alpha-value>)",
        "accent-light-red": "hsl(var(--accent-light-red) / <alpha-value>)",
        "ferozi": "hsl(var(--ferozi) / <alpha-value>)",
      },
      fontFamily: {
        "freeSans-bold": ["freeSansBold"],
        "bebas-neue": ["Bebas Neue"],
        "helvetica": ["Helvetica"],
      }
    },
  },
  plugins: [],
}
