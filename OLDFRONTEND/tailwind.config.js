/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B956',      // Verde Code Club
        secondary: '#FFE600',    // Amarillo para llamados a la acción
        accent: '#1D1D1B',       // Negro intenso para texto
        neutral: '#F8F8F8',      // Fondo claro
        'neutral-white': '#FFFFFF', // Blanco puro
        gray: {
          100: '#F3F4F6', // gris claro para bordes o fondos sutiles
          300: '#D1D5DB', // gris para bordes de input
          600: '#4B5563', // gris para texto secundario
          800: '#1F2937', // gris oscuro para elementos de footer o texto menos prominente
        },
        cardPurple: '#4b4fb4',   // 2 + million
        cardPeach:  '#fad8cf',   // 100 + countries
        cardBlue:   '#1da8e1',   // 90 %
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
