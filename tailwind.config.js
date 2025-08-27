/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hover': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'dark-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
        'dark-card': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-premium': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        'elegant': '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
        'ethereal': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'digit-bounce': 'digit-bounce 2s ease-in-out infinite',
        'text-glow': 'text-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0deg)' },
          '75%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        'bounce-gentle': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '25%': { 
            transform: 'translateY(-8px) rotate(5deg)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': { 
            transform: 'translateY(-12px) rotate(0deg)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '75%': { 
            transform: 'translateY(-4px) rotate(-5deg)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fadeInUp': {
          'from': { opacity: '0', transform: 'translate3d(0, 30px, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'slideInRight': {
          'from': { opacity: '0', transform: 'translate3d(30px, 0, 0)' },
          'to': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.2), 0 0 40px rgba(147, 51, 234, 0.1), 0 0 60px rgba(236, 72, 153, 0.05)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 60px rgba(147, 51, 234, 0.2), 0 0 80px rgba(236, 72, 153, 0.1)',
            transform: 'scale(1.02)'
          },
        },
        'digit-bounce': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '25%': { transform: 'translateY(-8px) rotateX(10deg)' },
          '50%': { transform: 'translateY(-12px) rotateX(0deg)' },
          '75%': { transform: 'translateY(-4px) rotateX(-10deg)' },
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2), 0 0 30px rgba(236, 72, 153, 0.1)' },
          '50%': { textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}
