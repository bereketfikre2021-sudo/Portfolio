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
