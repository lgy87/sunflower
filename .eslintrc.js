module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
    jsx: true,
    useJSXTextNode: true,
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
    es6: true,
  },
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["react-hooks", "react", "import", "jsx-a11y", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-use-before-define": "off",
    "react/prop-types": "off",
    "no-extra-semi": "off",
    "no-case-declarations": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
}
