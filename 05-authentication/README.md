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
   - It adds env variable in .env file : `DATABASE_URL="postgresql://postgres:randompassword@localhost:5432/mydb?schema=public"`
4. Install Prisma Client for Database Interactions
   - `npm install @prisma/client`
5. Setup dbconfig

```js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
```

### Step 4 : Create Migration Files

- Create Models
- Create Migration File
  - `npx prisma migrate dev --name migration_file_name`
- Create seeds file

### Step 5 : Open Prisma Studio

- `npx prisma studio`

### Format

- Prisma Format `npx prisma format`

### Installation

- `npm install`

### Start the Application

- Production : `npm start`
- Development : `npm run dev`

/////////////////////////////////

### Installation

- `npm install`

### Start the Application

- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
