export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      letterSpacing: {
        ultra: "0.32em"
      },
      textShadow: {
        brand: "0 10px 40px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-brand": {
          textShadow: "0 10px 40px rgba(0,0,0,0.6)"
        }
      });
    }
  ]
};