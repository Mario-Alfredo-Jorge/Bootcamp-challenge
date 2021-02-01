module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prittier/react'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prittier'
  ],
  rules: {
      'prittier/prittier': 'error',
      'react/jsx-filename-extension': [
          'warn',
          { extensions: ['.jsx', '.js'] }
        ],
        'import/prefer-default-export': 'off'
  },
};
