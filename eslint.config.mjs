// eslint.config.mjs
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import testingLibrary from "eslint-plugin-testing-library";

export default [
  // Next.js core-web-vitals rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off",
    },
  },

  // TypeScript recommended rules
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // React Hooks rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Import path restriction and resolution
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/shared",
              from: [
                "./src/entities",
                "./src/features",
                "./src/widgets",
                "./src/app",
              ],
            },
            {
              target: "./src/entities",
              from: ["./src/features", "./src/widgets", "./src/app"],
            },
            {
              target: "./src/features",
              from: ["./src/widgets", "./src/app"],
            },
            {
              target: "./src/widgets",
              from: ["./src/app"],
            },
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

  // Testing Library rules for test files only
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    plugins: {
      "testing-library": testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Disable rules conflicting with Prettier
  prettierConfig,
];
