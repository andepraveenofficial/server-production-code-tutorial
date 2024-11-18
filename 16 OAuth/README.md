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

3. Install sessionStorage : `npm install express-session`

- Install sessionStorage types : `npm install -d @types/express-session`

### Fix Errors

- Created Global AuthRequest

```ts
declare global {
	export namespace Express {
		export interface User {
			user: {
				userId: string;
				userEmail: string;
			};
		}
	}
}
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
