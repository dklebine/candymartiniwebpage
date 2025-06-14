/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'bounce-up': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'bounce-up': 'bounce-up 1s infinite',
      },
      colors: {
        black: '#0a0a0a',
        white: '#fff',
        neonPink: '#ff3ec8',
        neonBlue: '#00eaff',
        neonGreen: '#39ff14',
        neonYellow: '#fff700',
        neonPurple: '#a259ff',
        neonOrange: '#ff9900',
        neonRed: '#ff1744',
      },
      fontFamily: {
        heading: [
          '"Montserrat"',
          '"Inter"',
          'sans-serif',
        ],
        body: [
          '"Montserrat"',
          '"Inter"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
