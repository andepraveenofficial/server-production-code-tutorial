# Authentication

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Authentication

1. CookieStorage
2. Authorization Header

#### 1. bcrypt

- Install bcrypt : `npm install bcrypt`
- Install bcrypt types : `npm install -D @types/bcrypt`

#### 2. token

- Install jsonwebtoken : `npm install jsonwebtoken`
- Install jsonwebtoken types : `npm install -D @types/jsonwebtoken`

#### 3. cookieParser

- Install cookieParser : `npm install cookie-parser`
- Install cookieParser types : `npm install -D @types/cookie-parser`

### Installation

- `npm install`

### Start the Server

- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
