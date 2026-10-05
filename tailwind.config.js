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
        background: '#030712',
        surface: '#080D1A',
        'surface-elevated': '#0C1322',
        card: '#0B1120',
        'card-border': 'rgba(255, 255, 255, 0.08)',
        'card-border-hover': 'rgba(99, 102, 241, 0.4)',
        primary: '#6366F1',
        'primary-hover': '#4F46E5',
        cyan: {
          DEFAULT: '#06B6D4',
          glow: '#22D3EE',
          dark: '#083344',
        },
        emerald: {
          DEFAULT: '#10B981',
          glow: '#34D399',
          dark: '#064E3B',
        },
        indigo: {
          DEFAULT: '#6366F1',
          glow: '#818CF8',
          dark: '#1E1B4B',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          glow: '#A78BFA',
        },
        amber: {
          DEFAULT: '#F59E0B',
          glow: '#FBBF24',
        },
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
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
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      backgroundSize: {
        '200%': '200%',
        '300%': '300%',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glow-indigo': '0 0 30px rgba(99, 102, 241, 0.35)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.35)',
        'glow-sm': '0 0 12px rgba(6, 182, 212, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};