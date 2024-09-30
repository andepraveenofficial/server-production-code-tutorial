# Third Party Middlewares

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### Third Party Middlewares

1. cors
2. helmet
3. express-rate-limit

### 1. cors

CORS allows one website to get data from another website, but only if the other website says it's okay.

- Install : `npm install cors`
- Install cors types : `npm install -D @types/cors`

```ts
app.use(cors()); // Allows all origins by default
```

```ts
// CORS options
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];
const corsOptions = {
  // origin: "http://localhost:3000", // Allow only requests from this origin
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // CORS origin
```

### 2. helmet

By simply adding `app.use(helmet())` to your Express.js application, Helmet will automatically set several security headers based on industry best practices.

- Install : `npm install helmet`

### 3. express-rate-limit

Express-rate-limit is a tool that helps protect your Express app from too many requests being made too quickly (like someone trying to overload your server). It works by limiting how many times a user can hit your server within a certain time frame.

- Install : `npm install express-rate-limit`
- Docs : [https://express-rate-limit.mintlify.app/quickstart/usage]

### Installation

- `npm install`

### Start the Server

- Connect prismaClient : `npx prisma generate`
- Migrations : `npm run migrate`
- Seeds : `npm run seed`
- Build : `npm run build`
- Production : `npm start`
- Development : `npm run dev`
