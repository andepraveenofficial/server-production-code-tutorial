# Clean Code

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Clean Code

#### 1. Initialize git

- Run `git init`
- Create a `.gitignore` file (ensure to include `node_modules/`, `.env`, and `dist/` in it).

### 2. husky

- Install husky : `npm install -D husky`
- Initialize husky : `npx husky init`
- Add a `pre-commit` hook:
  - Inside the **husky** folder, create a pre-commit file and add below code (These run before commit):

```bash
npm run format
npm run lint
npm run lint:fix
git status
```

#### 3. Eslint

- Install eslint : `npm install -D eslint`
- ESLint to understand TypeScript syntax : `npm install -D @typescript-eslint/parser`
- linting rules specific to TypeScript : `npm install -D @typescript-eslint/eslint-plugin`
- Initialize eslint : `npx eslint --init`

```bash
1. How would you like to use ESLint?
Select: To check syntax and find problems

2. What type of modules does your project use?
Choose : JavaScript modules (import/export).

3. Which framework does your project use?
Choose : None of these (assuming it's a Node.js project without a frontend framework).

4. Does your project use TypeScript?
Choose : Yes.

5. Where does your code run?
Choose :  Node.

6. Would you like to install them now?
Choose : Yes

7.  Which package manager do you want to use? ...
Choose : npm
```

- After initialization, eslint creates `eslint.config.mjs` file.

```mjs eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: tsParser, // Specify the parser for TypeScript files
      globals: globals.browser,
    },
    plugins: {
      prettier, // Use Prettier as a plugin object
      '@typescript-eslint': tseslint, // Add TypeScript ESLint as a plugin object
    },
    rules: {
      'no-unused-vars': 'error', // Unused variables
      indent: ['error', 2], // Indentation
      quotes: ['error', 'single'], // Strings must be in single quotes
      'no-console': 'warn', // Allow console statements but warn
      'no-debugger': 'error', // Throw an error if the debugger statement is used
      eqeqeq: ['error', 'always'], // Use === and !== instead of == and !=
      semi: ['error', 'always'], // Use semicolons at the end of statements
      curly: ['error', 'all'], // Require curly braces for all control statements
      camelcase: 'error', // Use camelCase for variable and function names
      'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
      '@typescript-eslint/no-unused-vars': ['warn'], // TypeScript specific rule for unused vars
      'prettier/prettier': 'error', // Integrate Prettier rules with ESLint
    },
  },
  // Include recommended configurations directly
  pluginJs.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: globals.node,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Additional rules from TypeScript ESLint
      ...tseslint.configs.recommended.rules,
    },
  },
];
```

- Run lint : Add these in script file

```json
 "lint": "eslint src/**/*.ts",
 "lint:fix": "eslint src/**/*.ts --fix"
```

### 4. prettier

- Install prettier : `npm install -D prettier`
- Create `.prettierrc` :

```js
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "printWidth": 80
}

```

- Run prettier

```json
    "format": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
```

- Add `.prettierignore`

```prettierignore
rest-client

# Build output
dist/
build/
out/

# Node modules
node_modules/

# TypeScript declaration files
*.d.ts

# Environment files
.env
.env.*

# Lock files
package-lock.json
pnpm-lock.yaml
yarn.lock

# Compiled JavaScript files
src/**/*.js

# Ignore specific config files
.eslintrc.js
tsconfig.json

```

#### 5. combine eslint and prettier

- `npm install -D eslint-config-prettier eslint-plugin-prettier`

### Installation

- `npm install`

### Start the Server

- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
