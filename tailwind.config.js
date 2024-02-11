/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors : {
      // Primary Color
      'purple': 'hsl(259, 100%, 65%)',
      'light-red': 'hsl(0, 100%, 67%)',

      // Neutral
      'white': 'hsl(0, 0%, 100%)',
      'off-white': 'hsl(0, 0%, 94%)',
      'light-grey': 'hsl(0, 0%, 86%)',
      'smokey-grey': 'hsl(0, 1%, 44%)',
      'off-black': 'hsl(0, 0%, 8%)'
    },
    extend: {
      borderRadius: {
        'br-6xl': '5rem' 
      },
      scale: {
        '60': '0.6'
      },
      fontSize: {
        '3.3xl' : '32px'
      }
    },
  },
  plugins: [],
}