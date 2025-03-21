import testingLibrary from "eslint-plugin-testing-library";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "prettier"],
    rules: {
      "constructor-super": "error",
      "no-class-assign": "error",
      "no-confusing-arrow": [
        "error",
        {
          allowParens: true,
        },
      ],
      "no-dupe-class-members": "error",
      "no-this-before-super": "error",
      "no-useless-constructor": "error",
      "no-var": "error",
      "prefer-arrow-callback": [
        "warn",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true,
        },
      ],
      "prefer-const": [
        "warn",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: true,
        },
      ],
      "prefer-template": "warn",
      "prefer-destructuring": [
        "warn",
        {
          VariableDeclarator: {
            array: false,
            object: true,
          },
          AssignmentExpression: {
            array: true,
            object: true,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "no-shadow-restricted-names": "error",
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "no-shadow": "error",
      "no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: true,
        },
      ],
      curly: ["error", "multi-line"],
      eqeqeq: [
        "error",
        "always",
        {
          null: "ignore",
        },
      ],
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-filename-extension": "off",
      "react/jsx-boolean-value": [
        "error",
        "never",
        {
          always: [],
        },
      ],
      "react/no-deprecated": ["error"],
      "react/prefer-es6-class": ["error", "always"],
      "react/prefer-stateless-function": [
        "warn",
        {
          ignorePureComponents: true,
        },
      ],
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",
      "react/no-array-index-key": "error",
      "react/no-unused-state": "warn",
      "react/no-typos": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "error",
      "react/require-default-props": "off",
      "react/jsx-key": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  }),
  {
    // Note: there should be no other properties in this object
    ignores: [".next"],
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    ...testingLibrary.configs["flat/react"],
  },
];

export default eslintConfig;
