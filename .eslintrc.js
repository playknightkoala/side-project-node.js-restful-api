module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-tabs": 0,
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    semi: [1, "always"],
    indent: ["off", 2],
    "dot-notation": 0,
    "space-before-function-paren": 0,
    "comma-dangle": ["off", "always-multiline"],
  },
};
