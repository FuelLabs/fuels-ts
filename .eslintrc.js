module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    // https://github.com/typescript-eslint/typescript-eslint/issues/251#issuecomment-567365174
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    jsdoc: { mode: 'typescript' },
    'import/internal-regex': '@fuel-toolbox',
  },
  rules: {
    // Disable error on devDependencies importing since this isn't a TS library
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-await-in-loop': 0,
    'prefer-destructuring': 0,
    'no-bitwise': 0,
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal'], ['parent'], ['sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    '@typescript-eslint/consistent-type-imports': 2,
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/prefer-default-export': 'off',
    'tsdoc/syntax': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  // Disable no-unused-expressions to allow chai 'expect' expressions in testing
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ],
};
