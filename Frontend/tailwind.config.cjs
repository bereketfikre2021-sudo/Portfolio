/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#050a1f',
          light: '#b4e8c9',
        },
      },
      fontFamily: {
        sans: ['Nunito Sans', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'hero-line-1': 'heroLineIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'hero-line-2': 'heroLineIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards',
        'hero-shimmer': 'heroShimmer 2.8s ease-in-out 0.45s infinite',
        'hero-glow': 'heroGlow 2.2s ease-in-out 0.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroLineIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        heroGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.12)' },
        },
      },
    },
  },
  plugins: [],
};
