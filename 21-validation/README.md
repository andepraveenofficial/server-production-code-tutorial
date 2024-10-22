# Validation

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Validation Setup : zod

- Install zod : `npm install zod`
- Install zod types : Zod is written in TypeScript and already includes its type definitions.

```ts zod
import { z } from "zod";

const User = z.object({
	username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```

### Installation

- `npm install`

### Start the Server

- Prisma Format : `npx prisma format`
- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
- Prisma Studio (Database) : `npx prisma studio`
