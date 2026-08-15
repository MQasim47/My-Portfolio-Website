/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        card: '#0F1A15',
        'card-border': '#0F3D2E',
        'accent-primary': '#0F3D2E',
        'accent-hover': '#2E8B57',
        mint: '#A8E6CF',
        'text-primary': '#E0E0E0',
        'text-secondary': '#A0A0A0',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-poppins)'],
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'orbit': 'orbit 8s linear infinite',
      },
      backgroundSize: {
        '300%': '300%',
      },
      boxShadow: {
        'glow-mint': '0 0 20px rgba(168, 230, 207, 0.3)',
        'glow-green': '0 0 30px rgba(46, 139, 87, 0.4)',
        'glow-sm': '0 0 10px rgba(168, 230, 207, 0.2)',
      },
    },
  },
  plugins: [],
};