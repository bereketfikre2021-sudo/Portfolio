/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
          DEFAULT: '#33202A', // Dark purple-brown (dark mode default)
          50: '#f7f5f6',
          100: '#efebed',
          200: '#dfd7db',
          300: '#cfc3c9',
          400: '#bfafb7',
          500: '#33202A',
          600: '#2a1a22',
          700: '#21141a',
          800: '#180e12',
          900: '#0f080a',
        },
        accent: {
          DEFAULT: '#8AEA92', // Bright green (same for both modes)
          50: '#f0fdf2',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#8AEA92',
          600: '#6dd475',
          700: '#52be58',
          800: '#37a83b',
          900: '#1c921e',
        },
        neutral: {
          DEFAULT: '#5F5566', // Muted purple-gray (dark mode default)
          50: '#f8f7f9',
          100: '#f1eff2',
          200: '#e3dfe5',
          300: '#d5cfd8',
          400: '#c7bfcb',
          500: '#5F5566',
          600: '#4c4452',
          700: '#39333e',
          800: '#26222a',
          900: '#131116',
        },
        light: {
          DEFAULT: '#80ADA0', // Sage green (dark mode default)
          50: '#f0f7f5',
          100: '#e1efea',
          200: '#c3dfd5',
          300: '#a5cfc0',
          400: '#87bfab',
          500: '#80ADA0',
          600: '#668a80',
          700: '#4d6760',
          800: '#334440',
          900: '#1a2220',
        }
      },
      fontFamily: {
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
