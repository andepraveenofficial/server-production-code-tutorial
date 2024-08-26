# Advanced Error Handling : NodeJS with Typescript

## Project Setup

1. Create NodeJS Environment
2. Install Auto Restarter : `npm instal -D nodemon`
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

### Add Enviroment Variables

1. Install dotenv : `npm install dotenv`
2. Import dotenv and configure

```js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
```

### Installation

- `npm install`

### Start the Application

- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
