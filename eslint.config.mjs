import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  // Next.js core-web-vitals rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off",
    },
  },
  // TypeScript recommended rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
  // React Hooks rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "react-hooks": reactHooksPlugin },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: { import: importPlugin },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            { target: "./src/app", from: "./src/widgets" },
            { target: "./src/app", from: "./src/features" },
            { target: "./src/app", from: "./src/entities" },
            { target: "./src/app", from: "./src/shared" },

            { target: "./src/widgets", from: "./src/features" },
            { target: "./src/widgets", from: "./src/entities" },
            { target: "./src/widgets", from: "./src/shared" },

            { target: "./src/features", from: "./src/entities" },
            { target: "./src/features", from: "./src/shared" },

            { target: "./src/entities", from: "./src/shared" },
          ],
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  // Disable rules conflicting with Prettier
  prettierConfig,
];
