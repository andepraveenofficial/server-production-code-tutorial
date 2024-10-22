# Swagger

- Install UI : `npm install swagger-ui-express`
- Install Autogen : `npm install -D swagger-autogen`

Add this code

```ts
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import swaggerDocument from './swagger.json';

const app = express();
const port = 5000;

app.get('/api-docs', swaggerUi.setup(swaggerDocument));
```

- Go with documentation : [https://swagger-autogen.github.io/docs/getting-started/quick-start]

```json
    "swagger": "node ./swagger.mjs"
```

- Run swagger : `npm run swagger`

- Enable in tsconfig : `"resolveJsonModule": true,`
