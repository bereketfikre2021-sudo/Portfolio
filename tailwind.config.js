/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind v3+ automatically purges unused CSS based on content paths
  // Only classes found in these files will be included in the final CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Safelist any classes that might be dynamically generated
  safelist: [
    'aspect-video',
    'aspect-square',
    'aspect-portrait',
    // Dynamic aspect ratios
    'aspect-16-9',
    'aspect-5-4',
    'aspect-3-1',
    // Dynamic min-heights
    'min-h-200',
    'min-h-320',
    'min-h-32',
    'min-h-64',
    'min-h-48',
    'min-h-40',
    // Dynamic min-widths
    'min-w-48',
    'min-w-64',
    'min-w-40',
  ],
  theme: {
    extend: {
      colors: {
        // Keep original colors as default (dark mode)
        primary: {
          DEFAULT: '#000000', // Pure black (dark mode default)
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        secondary: {
          DEFAULT: '#000000', // Black - Using only Huemint palette: #000000 and #8AEA92
          50: '#000000',
          100: '#000000',
          200: '#000000',
          300: '#000000',
          400: '#000000',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        accent: {
          DEFAULT: '#8AEA92', // Green - Using only Huemint palette: #000000 and #8AEA92
          50: '#8AEA92',
          100: '#8AEA92',
          200: '#8AEA92',
          300: '#8AEA92',
          400: '#8AEA92',
          500: '#8AEA92',
          600: '#8AEA92',
          700: '#8AEA92',
          800: '#8AEA92',
          900: '#8AEA92',
        },
        neutral: {
          DEFAULT: '#000000', // Black - Using only Huemint palette: #000000 and #8AEA92
          50: '#8AEA92',
          100: '#8AEA92',
          200: '#8AEA92',
          300: '#8AEA92',
          400: '#8AEA92',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        light: {
          DEFAULT: '#8AEA92', // Green - Using only Huemint palette: #000000 and #8AEA92
          50: '#8AEA92',
          100: '#8AEA92',
          200: '#8AEA92',
          300: '#8AEA92',
          400: '#8AEA92',
          500: '#8AEA92',
          600: '#8AEA92',
          700: '#8AEA92',
          800: '#8AEA92',
          900: '#8AEA92',
        }
      },
      fontFamily: {
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
