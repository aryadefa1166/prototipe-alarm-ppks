/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        usu: {
          DEFAULT: '#155e37', // Hijau Khas USU
          light: '#2d8a55',
          dark: '#0d3b22',
        },
        danger: {
          DEFAULT: '#FF3B30', // Merah iOS Standard
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-short': 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}