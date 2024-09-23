# OAuth

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### OAuth Setup

1. Install passport : `npm install passport`

- Install passport types : `npm install -D @types/passport`

2. Install passport stratergy : `npm install passport-google-oauth2`

- Install passport stratergy types : `npm install -D @types/passport-google-oauth2`

### Fix Errors

- Created Global AuthRequest

```ts
interface AuthRequest {
  userId: string;
  userEmail: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthRequest;
    }
  }
}

export {};

```

### Installation

- `npm install`

### Start the Server

- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
