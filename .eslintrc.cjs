/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

// eslint-disable-next-line
// @ts-ignore
const { rules, plugins } = require("@louisandrew3/eslint-config/base");

/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  plugins,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  extends: [
    // "@louisandrew3/eslint-config/base",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    ...rules,
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};

module.exports = config;
