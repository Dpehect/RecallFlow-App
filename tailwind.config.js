/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17140F',
          soft: '#6B6459',
          faint: '#A79E8F',
        },
        paper: {
          DEFAULT: '#FAF6EE',
          raised: '#FFFFFF',
          sunken: '#F1EADA',
        },
        rust: {
          DEFAULT: '#C6440C',
          dark: '#9A3509',
          tint: '#FBE3D3',
        },
        moss: {
          DEFAULT: '#2F5233',
          dark: '#203A24',
          tint: '#DCE9D6',
        },
        gold: {
          DEFAULT: '#F2BE31',
          dark: '#B9860A',
          tint: '#FDF0C8',
        },
        plum: {
          DEFAULT: '#6B3FA0',
          tint: '#EEE3F7',
        },
        sky: {
          DEFAULT: '#1B6E8C',
          tint: '#DDEEF3',
        },
        danger: {
          DEFAULT: '#AD2A1E',
          tint: '#F8DBD6',
        },
        brand: {
          50: '#FBE3D3',
          500: '#C6440C',
          600: '#9A3509',
          700: '#7A2A07',
          900: '#4A1A05',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        ink: '3px 3px 0px #17140F',
        'ink-sm': '2px 2px 0px #17140F',
        'ink-lg': '6px 6px 0px #17140F',
        'ink-xl': '9px 9px 0px #17140F',
      },
      borderRadius: {
        none: '0px',
      },
      letterSpacing: {
        widest2: '0.14em',
      },
    },
  },
  plugins: [],
}
