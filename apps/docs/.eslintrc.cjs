module.exports = {
  extends: ["../../.eslintrc.js"],
  rules: {
    "no-console": "off",
    "no-new": "off",
    "tsdoc/syntax": "off",
  },
  overrides: [
    {
      files: ["src/**/snippets/**/*.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "variable",
            format: ["camelCase", "PascalCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            filter: {
              regex: "^_test_options$",
              match: false,
            },
          },
        ],
      },
    },
  ],
};
