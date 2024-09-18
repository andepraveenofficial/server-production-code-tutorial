# NodeJS Production Code

<details>
<summary>Index</summary>

## Index

- Server
- Database
- API Design

</details>

---

<details>
<summary>Flow</summary>

## FLow

1. Basic Setup (prismaORM + Postgres)
2. Clean Code
3. Express Built-in Middlewares
   - `express.json()`
   - `express.static()`
4. Third Party Middlewares
   - `cors` : Cross-Origin Resource
   - `helmet` : security
   - `express-rate-limit` : control the api-call rate limit
5. Error Handling
   - global errorMiddleware
   - Custom errorHandler
   - Not Found Route
6. DTOs Structure

   - HttpResponse

   ```ts
   success:boolean,
   statusCode:number,
   message:string,
   data:unknown,
   req:{
      ip:req.ip || null,
      method:req.method,
      url:req.originalUrl
   }
   ```

   - HttpError

     ```ts
     success:boolean,
     statusCode:number,
     message:string,
     data:unknown
     trace?: object | null // Learn trace
     ```

7. Response Handling
8. asyncHandler
9. authentication (Tokens)
10. Authorization (RBAC)
11. queryOptions
12. swagger
13. Docker

</details>

---

<details>
<summary>Database</summary>

## Database

1. Database Schema Design

</details>

---

<details>
<summary>API Design</summary>

## API Design

</details>

---

Others :

1. source map support
2. colorette

---

healt endpoint
