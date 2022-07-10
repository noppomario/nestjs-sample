module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'security'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
  rules: {
    // 関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    'no-use-before-define': 'off',

    // typescript側のno-use-before-defineを使うようにする
    '@typescript-eslint/no-use-before-define': ['error'],

    // named exportがエラーになるので使えるようにoff
    'import/prefer-default-export': 'off',

    // thisを使わないインスタンスメソッドを許容する
    'class-methods-use-this': 'off',

    // NestJSデフォルト
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
