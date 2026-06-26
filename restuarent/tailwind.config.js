/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#fbf7ef',
          50: '#fffdf8',
          100: '#f3eadc',
          200: '#e8dcc8',
          300: '#d4c4a8',
          400: '#b8a88a',
        },
        primary: {
          DEFAULT: '#241d16',
          muted: '#756b5f',
        },
        accent: {
          DEFAULT: '#b8914f',
          light: '#c6a972',
          dark: '#9a7840',
        },
        muted: {
          DEFAULT: '#756b5f',
          light: '#9a8f82',
          dark: '#5c5349',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        wide: '0.32em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
