# DTOs

### Techstack

1. Environment : `NodeJS`
2. Language : `Typescript`
3. Server : `express`
4. ORM : `prismaORM`
5. Database : `Postgresql`

### DTOs

- **DTO** stands for **Data Transfer Object**

#### 1. Models

- Purpose: Models represent the structure of your data as it exists in the database.
- Example: If you have a table called products in your database, the model would define what a product looks like in your code.
- How they are used: Models are often used to interact with the database — fetching, creating, updating, and deleting data.

### 2. DTOs (Data Transfer Objects):

- Purpose: DTOs are used to transfer data between different parts of your application, like between your backend and frontend, or between different services.
- Why they are used: They help ensure only the necessary data is passed around. For example, when creating a product, you might only need the name and price — you don’t need to send or receive things like createdAt or id because they are handled by the system.
- How they are used: DTOs are typically used in API requests and responses to control what data is sent or received.

### How They Work Together:

- Models are tied to the database and represent the complete structure of an entity.
- DTOs are used to simplify what data is sent or received during certain operations, like creating or updating a product.

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
