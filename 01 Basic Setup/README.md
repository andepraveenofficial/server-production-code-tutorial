# Project Setup

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Setup

#### 1. Environment

1. Create NodeJS environment : `npm init -y`
2. Create `index.js` file and write `javascript` code and run the Application.

```js
console.log("Hello, world!");
```

- Start the Application : `node index.js`
- Change script in `package.json` file for add command to start the application.

```json
"scripts": {
    "start": "node index.js",
  },
```

- Start the Application : `npm start`

3. Install Auto Restarter : `npm install -D nodemon`

- Start the Application : `nodemon index.js`
- Change script in `package.json` file for add command to start the application.

```json
"scripts": {
    "start": "node index.js",
    "dev":"nodemon index.js",
  },
```

- Start the Application : `npm run dev`

#### 2. Language

1. Add Typescript language : `npm install -D typescript`
2. Add typescript configuration File : `npx tsc --init`, Change the configuration

```ts
"rootDir": "./src",
"outDir": "./dist",
```

3. Install node types : `npm install -D @types/node`
4. Run the the Typescript code without compile : `npm install -D ts-node`

- Create `index.ts` file in **src** folder and write `Typescript` code and run the Application.

```js
const message: string = "Hello, world!";
console.log(message);
```

- Run the Application : `ts-node ./src/index.ts`

- Change script file in `package.json` according to **typescript** to start the application.

```json
"main": "./dist/index.js"
```

```json
"scripts": {
    // "start": "node index.js",
    // "dev": "nodemon index.js",
    "build": "tsc",
    "start": "node ./dist/src/index.js",
    "dev": "nodemon --exec ts-node ./src/index.ts"
  },
```

- Start the Application at production : `npm start`
- Start the Application at development : `npm run dev`

#### 3. Server

1. Install Server : `npm install express`
2. Install express types : `npm install -D @types/express`
3. Write express code and run the server.

```ts index.ts
import express, { Request, Response } from "express";

const app = express();
const port = 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});
```

1. Setup Environment Variables :

- Install dotenv : `npm install dotenv`
- Import `dotenv` and config the dotenv in `index.ts` file

```ts
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
```

### 4. ORM

1. Install PrismaORM : `npm install prisma`
2. Create Prisma Schema
   - `npx prisma init` : This command creates a prisma folder with a **schema.prisma** file.
   - It adds environment variable in `.env` file : `DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydbName?schema=public"`
3. Install Prisma Client for Database Interactions
   - `npm install @prisma/client`
4. Setup dbconfig

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export default prisma;
```

5. Create Prisma Schema

```prisma
model Product {
  id        String   @id @default(uuid())
  name      String   @unique
  price     Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // optional field for soft deletes
}
```

7. Prisma Format `npx prisma format`
8. `npx prisma generate` : Run `prisma generate` to generate the Prisma Client. You can then start querying your database.

9. Run `npx prisma db pull` to turn your database schema into a Prisma schema.
10. Create Migration File for create database and tables.

    - `npx prisma migrate dev --name migration_file_name`

11. Create seed files

- Using seed file to insert data into database
- If any typescript errors, change tsconfig files

```json
{
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./dist"
  },
  "include": ["src/**/*", "prisma/seeds/**/*"]
}
```

8. Add migrate and seed script in `package.json` file.

```json
"scripts": {
    // "start": "node index.js",
    // "dev": "nodemon index.js",
    "build": "tsc",
    "start": "node ./dist/src/index.js",
    "dev": "nodemon --exec ts-node ./src/index.ts",
    "migrate": "npx prisma migrate dev",
    "seed": "ts-node prisma/seeds/main.seed.ts"
  },
```

10. Prisma Studio : `npx prisma studio`

### 5. Database

1. Open Postgresql Database and start the database.

### Installation

- `npm install`

### Start the Server

- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
