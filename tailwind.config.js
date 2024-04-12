/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        lightgray: "#707e93",
        lightblue: "#d7e2e9",
        seablue: "#a5d2eb",
        deepblue: "#182F53",
        darkblue: "#259AC2",
      },
      width: {
        "md-1": "340px",
      },
      height: {
        "md-1": "231px",
        sm: "60px",
      },
    },
  },
  plugins: [],
};
