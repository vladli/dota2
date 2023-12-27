module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort", "unused-imports"],
  rules: {
    // Possible errors
    "no-console": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    // Best practices
    "dot-notation": "error",
    "no-else-return": "error",
    "no-floating-decimal": "error",
    "no-sequences": "error",
    // Stylistic
    "array-bracket-spacing": "error",
    "computed-property-spacing": ["error", "never"],
    curly: "off",
    "no-lonely-if": "error",
    "no-unneeded-ternary": "error",
    "one-var-declaration-per-line": "error",

    // ES6
    "array-callback-return": "off",
    "prefer-const": "error",
    // Imports
    "import/prefer-default-export": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "no-unused-expressions": "off",
    "no-prototype-builtins": "off",
    // REACT
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/href-no-hash": [0],
    "react/display-name": 0,
    "react/no-deprecated": "error",
    "react/no-unsafe": [
      "error",
      {
        checkAliases: true,
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        ignoreCase: true,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,

    // increase the severity of rules so they are auto-fixable
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
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
      },
    },
  ],
};
