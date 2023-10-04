module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'default-param-last': 'error',
    'dot-notation': 'error',
    eqeqeq: 'warn',
    'prefer-const': 'warn',
    radix: 'warn',
    'no-eval': 'error',
    'no-constructor-return': 'error',
    'no-duplicate-imports': 'error',
    'no-script-url': 'error',
    'no-sequences': 'error',
    'no-var': 'error',
    'no-useless-escape': 'off',
    'no-self-compare': 'error',
    'no-debugger': 'error',
    'no-unmodified-loop-condition': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
