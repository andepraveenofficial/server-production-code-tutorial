import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: ['prettier'], // Add Prettier plugin
    rules: {
      'no-unused-vars': 'error', // Unused variables
      indent: ['error', 2], // Indentation
      quotes: ['error', 'single'], // strings must be in single quotes
      'no-console': 'warn', // Allow console statements but warn, useful for development and reminding to clean up before production
      'no-debugger': 'error', // Throw an error if the debugger statement is used
      eqeqeq: ['error', 'always'], // use === and !== instead of == and !=
      semi: ['error', 'always'], // use semicolons at the end of statements
      curly: ['error', 'all'], // Require curly braces for all control statements
      camelcase: 'error', // use camelCase for variable and function names
      'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
