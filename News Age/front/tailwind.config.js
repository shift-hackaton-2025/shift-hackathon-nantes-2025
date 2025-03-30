/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#1F2937',
        'violet': '#6D28D9',
        'magenta': '#DB2777',
        'darkgray': '#1F2937',
        'offwhite': '#F8FAFC',
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}