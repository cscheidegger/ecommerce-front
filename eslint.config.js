
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "import": pluginImport,
      "jsx-a11y": pluginJsxA11y,
      "react": pluginReact,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Airbnb style rules
      "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": [
        "warn",
        { 
          "namedComponents": "arrow-function",
          "unnamedComponents": "arrow-function" 
        }
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "ts": "never",
          "tsx": "never",
          "js": "never",
          "jsx": "never"
        }
      ],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "jsx-quotes": ["error", "prefer-double"],
      "no-unused-vars": "off", // TypeScript handles this
    },
    settings: {
      "react": {
        "version": "detect",
      },
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  }
);
