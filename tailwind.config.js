/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1F1',
          100: '#FFE3E3',
          200: '#FFC7C7',
          300: '#FF9B9B',
          400: '#FF6B6B',
          500: '#FF3B3B',
          600: '#FF0B0B',
          700: '#CC0000',
          800: '#990000',
          900: '#660000',
        },
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        dark: '#2C3E50',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
} 