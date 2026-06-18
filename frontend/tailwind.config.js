/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        olive: {
          light: '#d4d9ba', // Keeping the previous light olive if needed elsewhere
          accent: '#8fbc8f',
        }
      }
    },
  },
  plugins: [],
}