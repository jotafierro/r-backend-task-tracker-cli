import js from '@eslint/js';
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'error',
      'no-console': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ["error", "always"],
      'quote-props': ['error', 'consistent-as-needed']
    }
  },
]
