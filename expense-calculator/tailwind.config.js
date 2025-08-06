/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#f5f2e3',
          dark: '#2a2a2a',
        },
        primary: {
          light: '#b5c4a1',
          dark: '#3a4d2b',
        },
        text: {
          light: '#3a3a3a',
          dark: '#f5f2e3',
        }
      }
    },
  },
  plugins: [],
} 