module.exports = {
  env: { node: true },
  root: true,
  ignorePatterns: ['.eslintrc.js',],
  parser: '@typescript-eslint/parser',
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'never'],
    'no-extra-boolean-cast': 'error',
    'no-unused-vars': [1, { 'args': 'none' }],
    'quotes': ['warn', 'single',  {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': 'error'
  }
};