/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // FSD 구조 전체
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007aff",
        hover_primary: "#0F5AF1FF",
        none: "transparent",
        "btn-primary": "#009ef7",
        default: "#dadada",
      },
    },
  },
  plugins: [],
};
