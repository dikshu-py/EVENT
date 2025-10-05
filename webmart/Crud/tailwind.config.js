module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // adjust to your project
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      boxShadow: {
        bottom: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', 
        // This matches the Tailwind `shadow-md` but only applied at the bottom
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
      colors: {
        primary: "#4D007D", // custom name and value
      },
    },
  },
plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    // optionally:
    // require('tailwind-scrollbar-hide')
  ],

};