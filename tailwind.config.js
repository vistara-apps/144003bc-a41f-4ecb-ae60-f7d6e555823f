/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 20%, 98%)',
        foreground: 'hsl(220, 40%, 15%)',
        accent: 'hsl(170, 100%, 40%)',
        primary: 'hsl(220, 100%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      borderRadius: {
        lg: '16px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 40%, 15%, 0.1)',
        focus: '0 0 0 3px hsl(220, 100%, 50%)',
      },
      spacing: {
        xl: '24px',
        lg: '16px',
        md: '8px',
        sm: '4px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
