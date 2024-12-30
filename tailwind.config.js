/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        none: 'none',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'bounce': 'bounce 1s infinite',
        'pop': 'pop 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'slideIn': 'slideIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'translateY(40px) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(0) scale(1.05)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(100px) scale(0.95)',
            filter: 'blur(4px)'
          },
          '60%': { 
            transform: 'translateY(-10px) scale(1.02)',
            filter: 'blur(0px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          }
        }
      },
      colors: {
        background: '#000000',
        primary: '#e94560',
        secondary: '#16161d',
        text: '#eaeaea',
        link: '#e94560',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
