import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007aff",
        hover_primary: "#0F5AF1FF",
        none: "transparent",
        default: "#F1EFEC",
        hover_default: "#E4E0E1",
      },
      borderRadius: {
        base: "0.475rem",
      },
      transition: {
        button:
          "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      },
      fontSize: {
        xs: "0.75rem",
        base: "0.813rem",
        sm: "0.925rem",
        lg: "1.15rem",
      },
      boxShadow: {
        button: "0 3px 3px #c0d5ff",
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
