/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tassar: {
          raw: '#E6D5B8',       // Natural organic golden-beige of Tassar silk
          earth: '#4A3E3D',     // Deep rich earthy brown for readable text
          deepGold: '#C5A059',  // Accent gold for borders and highlights
          madderRed: '#8B2635', // Premium traditional dye color
          cream: '#FBF9F5',     // Elegant, clean background spacing
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}