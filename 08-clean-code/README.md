# Clean Code

## Project Setup

1. Create NodeJS Environment
2. Install Auto Restarter : `npm install -D nodemon`
3. Add Typescript : `npm install -D typescript`
4. Add typescript configuration File : `npx tsc --init`, Change the configuration

```ts
"rootDir": "./src",
"outDir": "./dist",
```

5. Install node types : `npm install -D @types/node`
6. Run the the Typescript code without compile : `npm install -D ts-node`
7. Change script file in `package.json` according to **typescript**.

```json
"scripts": {
    // "start": "node index.js",
    // "dev": "nodemon index.js",
    "build": "tsc",
    "start": "node ./dist/index.js",
    "dev": "nodemon --exec ts-node ./src/index.ts"
  },
```

8. Install Server : `npm install express`
9. Install express types : `npm install -D @types/express`
10. Write express code and run the server.

```ts
import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get('/', (req: Request, res: Response) => {
  console.log('I am Home Route');
  res.send('I am Home route');
});
```

### Installation

- `npm install`

### Start the Application

- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`

### Clean Code

#### 1. Eslint

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

- After configuration eslint creates `eslint.config.mjs` file.

```mjs eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
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
```

- Run lint : Add these in script file

```json
 "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
```

### 2. prettier

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

#### 3. combine eslint and prettier

- `npm install -D eslint-config-prettier eslint-plugin-prettier`

### 4. Initialize git

- `git init`

### 4. husky

- Install husky : `npm install -D husky`
- Initialize husky : `npx husky`
- Create a pre-commit and add these commands

```
npm run format
npm run lint
npm run lint:fix
git status
```
