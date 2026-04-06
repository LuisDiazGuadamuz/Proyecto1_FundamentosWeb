/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        samara: {
          gold: '#C7A24A',
          'gold-light': '#E3CB8A',
          charcoal: '#1D1D1F',
          ash: '#4B4B4F',
          ivory: '#F8F7F4',
          stone: '#DDD8CC',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 14px 28px -16px rgba(29, 29, 31, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(140deg, #c7a24a 0%, #e3cb8a 45%, #c7a24a 100%)',
      },
    },
  },
  plugins: [],
}

