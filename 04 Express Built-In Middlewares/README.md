# Built-In Middlewares

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Express Built-In Middlewares

1. `express.json()`
2. `express.static()`

```ts
// parse incoming JSON payloads and make it available in req.body
app.use(express.json());

// Handle Static files
app.use(express.static(path.join(__dirname, "../", public)));

// Handle Routes
app.use("api/v1", v1Routes);
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
