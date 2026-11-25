/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F5FF',
          100: '#E1EDFE',
          200: '#CADDFD',
          300: '#A4C3FA',
          400: '#739FF7',
          500: '#4675F1',
          600: '#2651E5',
          700: '#1A3DC7',
          800: '#0E3A99', // Primary Brand Navy
          900: '#0A2566', // Deep Corporate Navy
          950: '#06163F',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0F172A',
          darkCard: '#1E293B',
          darkBorder: '#334155',
        },
      },
      fontFamily: {
        sans: [
          'Segoe UI',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Cascadia Code', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
        display: ['Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'page': '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.12)',
        'page-dark': '0 4px 16px rgba(0, 0, 0, 0.4), 0 0 2px rgba(255, 255, 255, 0.05)',
        'ribbon': '0 2px 4px rgba(0, 0, 0, 0.04)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      zIndex: {
        'modal': '1000',
        'dropdown': '900',
        'header': '800',
        'ribbon': '700',
        'ruler': '600',
      },
    },
  },
  plugins: [],
};
