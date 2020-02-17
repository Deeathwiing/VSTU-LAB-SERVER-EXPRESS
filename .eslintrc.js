module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "max-len": ["error", { code: 80 }],
    "no-use-before-define": ["error", { functions: false }],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore"
      }
    ],
    "linebreak-style": "off",

    "import/prefer-default-export": "off",
    "implicit-arrow-linebreak": "off",
    "no-plusplus": "off",
    "object-curly-newline": "off",

    "func-names": "off"
  }
};
