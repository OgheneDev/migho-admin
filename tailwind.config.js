/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#F1400C',
        'custom-grey': '#888181',
        'custom-ash': '#D9D9D9',
        'very-light-blue': '#EEEEEE',
        'very-dark-grey': '#CECECE99',
        'very-dark-ash': '#888181'
        
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        league: ['League Spartan', 'sans-serif']
      }
    },
  },
  plugins: [],
}

