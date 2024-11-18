# Authentication

## Project Setup

1. Create NodeJS Environment : `pnpm init`
2. Install Auto Restarter : `pnpm install -D nodemon`
3. Add Typescript : `pnpm install -D typescript`
4. Add typescript configuration File : `npx tsc --init`, Change the configuration

```ts
"rootDir": "./src",
"outDir": "./dist",
```

5. Install node types : `pnpm install -D @types/node`
6. Run the the Typescript code without compile : `pnpm install -D ts-node`
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

8. Install Server : `pnpm install express`
9. Install express types : `pnpm install -D @types/express`
10. Write express code and run the server.

```ts
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

### ORM Setup

### step1 : Database Setup

- Install PostgresSQL
- Open pgadmin

### step2 : Prisma Setup

1. Setup Environment Variables : `pnpm install dotenv` and config the dotenv in `index.ts` file

```ts
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
```

2. Install Prisma : `pnpm install prisma`
3. `npx prisma init` : This will create a prisma folder with a schema.prisma file.
   - It adds env variable in .env file : `DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydbName?schema=public"`
4. Install Prisma Client for Database Interactions
   - `pnpm install @prisma/client`
5. Setup dbconfig

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export default prisma;
```

### Step 3 : Create Migration Files

- Create Models

```prisma
model Product {
  id        String   @id @default(uuid())
  name      String
  price     Float
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- Prisma to generate the Prisma Client : `npx prisma generate`
- Create Migration File to create database and tables.

  - `npx prisma migrate dev --name migration_file_name`

- Add script file

```json
  "migrate": "npx prisma migrate dev --name updated_migration",
  "seed": "ts-node prisma/seeds/main.seed.ts"
```

### Step4 : Run seed files

- Create seed files
- If errors, change tsconfig files :

```json
{
	"compilerOptions": {
		"rootDir": "./",
		"outDir": "./dist"
	},
	"include": ["src/**/*", "prisma/seeds/**/*"],
	"exclude": ["node_modules", "dist", "test/**/*"]
}
```

- Using seed file to insert data into database

### Step5 : Format

- Prisma Format `npx prisma format`

### Step6 : Open Prisma Studio

- `npx prisma studio`

### Installation

- `pnpm install`

### Start the Application

- `npx prisma generate`
- Migrations : `pnpm run migrate`
- Seeds : `pnpm run seed`
- Build : `pnpm run build`
- Production : `pnpm start`
- Development : `pnpm run dev`
