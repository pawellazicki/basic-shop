/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        scaleDown: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        scaleUp: 'scaleUp 0.5s ease forwards',
        scaleDown: 'scaleDown 0.5s ease forwards',
      }
    },
  },
  plugins: [],
}

