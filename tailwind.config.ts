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
        sm: "0.3rem",
      },
      transition: {
        button:
          "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
      },
      fontSize: {
        xs: "0.75rem" /* 12px */,
        base: "0.813rem" /* 13px */,
        sm: "0.925rem" /* 15px */,
        md: "1rem" /* 16px */,
        lg: "1.15rem",
      },
      boxShadow: {
        button: "0 3px 3px #c0d5ff",
        checkbox: "box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
    },
  },
  plugins: [],
};

export default config;
