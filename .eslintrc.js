module.exports = {
  extends: [
    // standard configuration
    "standard",

    // https://github.com/mysticatea/eslint-plugin-node#-rules
    "plugin:node/recommended",

    // disable rules handled by prettier
    "prettier",
    "prettier/standard",
  ],

  parserOptions: {
    ecmaVersion: 3,
    sourceType: "script",
  },

  rules: {
    // detect incorrect import
    "node/no-extraneous-import": "error",
    "node/no-missing-import": "error",

    // uncomment if you are using a builder like Babel
    // "node/no-unsupported-features/es-syntax": "off",

    strict: ["error", "function"],
  },
};
