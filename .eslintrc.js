module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // quotes: [0, 'single'],
    // semi: [2, 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // 不會檢查props的型態
    'react/prop-types': 2,
    // 警告尚有未使用的變數
    'no-unused-vars': 1,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
}
