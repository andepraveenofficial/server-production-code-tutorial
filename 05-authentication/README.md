# Authentication

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

### ORM Setup

### step1 : Database Setup

- Install PostgresSQL
- Open pgadmin

### step2 : Prisma Setup

1. Setup Environment Variables : `npm install dotenv`
2. Install Prisma : `npm install prisma`
3. `npx prisma init` : This will create a prisma folder with a schema.prisma file.
   - It adds env variable in .env file : `DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydbName?schema=public"`
4. Install Prisma Client for Database Interactions
   - `npm install @prisma/client`
5. Setup dbconfig

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
```

### Step 3 : Create Migration Files

- Create Models
- Prisma to generate the Prisma Client : `npx prisma generate`
- Create Migration File to create database and tables.
  - `npx prisma migrate dev --name migration_file_name`

### Step4 : Run seed files

- Create seed files
- If errors change tsconfig files :

```json
{
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./dist"
  },
  "include": ["src/**/*", "prisma/seeds/**/*"]
}
```

- Using seed file to insert data into database

### Step5 : Format

- Prisma Format `npx prisma format`

### Step6 : Open Prisma Studio

- `npx prisma studio`

### Installation

- `npm install`

### Start the Application

- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
