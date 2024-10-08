/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screen: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      colors: {
        darkPurple: "rgba(141,117,230,255)",
        lightPurple: "rgba(234,222,248,255)",
        dark: "rgba(50,48,59,255)",
        darkTilt: "rgba(71, 69, 80, 1)",
        creame: "rgba(251,244,228,255)",
        darkCreame: "rgba(248, 233, 199, 1)",
        lightGrey: "rgba(245,246,248,255)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        compagnon: ["Compagnon", "sans-serif"],
      }
    },
  },
}

