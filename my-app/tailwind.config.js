/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neverquit: {
          black: "#050505",
          dark: "#0B0B0B",
          card: "#101010",
          cardElevated: "#151515",
          red: "#FF1F26",
          redBright: "#FF3030",
          text: "#FFFFFF",
          secondary: "#A7A7A7",
          muted: "#737373",
          border: "#242424",
          borderSubtle: "#1D1D1D",
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'red-glow-sm': '0 0 15px rgba(255, 31, 38, 0.20)',
        'red-glow': '0 0 25px rgba(255, 31, 38, 0.25)',
        'red-glow-lg': '0 0 50px rgba(255, 48, 48, 0.30)',
        'card-hover': '0 12px 35px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(255, 31, 38, 0.22)',
      },
      lineHeight: {
        'tight-hero': '1.02',
        'heading': '1.15',
        'relaxed-body': '1.7',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'scan': 'scan 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(300%)' },
        },
      }
    },
  },
  plugins: [],
}
