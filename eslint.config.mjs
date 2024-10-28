import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import globals from "globals";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unUsedImports from "eslint-plugin-unused-imports";

// pnpm add -D @eslint/js globals typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-tailwindcss eslint-plugin-unused-imports

/**@type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  ...eslintPluginTailwindCSS.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist", "node_modules", ".next"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2022,
      },
      parserOptions: {
        project: ["tsconfig.json"],
      },
    },
    plugins: {
      next: eslintPluginNext,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "typescript-eslint": tsEslint.plugin,
      tailwindcss: eslintPluginTailwindCSS,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unUsedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            ["^(@|components)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];
