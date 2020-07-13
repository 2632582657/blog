module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": [
      0,
      "error",
      "windows"
    ],
    "quotes": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "prefer-const": 0,
    "spaced-comment": 0,
    "arrow-parens": 0,
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "guard-for-in": 0,
    "camelcase": 0,
    "no-prototype-builtins": 0,
    "prefer-object-spread": 0,
    "no-else-return": 0,
    "prefer-template": 0,
    "no-plusplus": 0,
    "global-require": 0,
    "import/order": 0,
    "no-unused-vars": 0,
    "no-unused-expressions": 0,
    "no-sequences": 0,
    "no-restricted-globals": 0,
    "no-useless-return": 0,
    "import/extensions": 0,
    "no-alert": 0,
    "operator-linebreak": 0,
    "no-useless-escape": 0,
    "radix": 0,
    "no-lonely-if": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    'Vue': true,
    'VueRouter': true,
    'axios': true
  }
}
