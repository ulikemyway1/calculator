module.exports = {
  env: {
    browser: true,
    es2024: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
      'import/extensions': {
        'import/extensions': 'never',
      },
    },
  },
  rules: {
    'no-console': 'warn',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
  },
};
