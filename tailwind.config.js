/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#05070E',
          card: 'rgba(255, 255, 255, 0.03)',
          cyan: '#00F2FE',
          purple: '#7928CA',
          emerald: '#10B981',
          pink: '#FF0080',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.8', transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
