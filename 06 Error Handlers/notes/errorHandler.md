# Handlers

<details>
<summary>Index</summary>

## Index

- Handler
- Middlewares
- Error Handler
- next
- instanceof
- Documentation

</details>

---

<details>
<summary>Handler</summary>

## Handler

In ExpressJS, we have handlers

1. Error Handler
2. Response Handler

</details>

---

<details>
<summary>Middlewares</summary>

## Middlewares

1. Normal Middleware
2. Error Middleware

### 1. Normal Middleware

- If you run same logic for every Request, you need to use middleware.
- Normal Middleware runs for every request, no matter which route is used.
- Purpose: Used for preprocessing requests and can handle tasks like logging, adding headers, or modifying request data.
- Location: Defined using `app.use()` and executes for every request before reaching the route handlers or other middleware.
- Function: Takes `req`, `res`, and `next` as parameters and must call `next()` to pass control to the next middleware or route handler.

```ts
// Use Normal Middleware before Route
app.use((req: Request, res: Response, next: NextFunction) => {
	// Normal Middleware
	console.log("Normal Middleware executed for every request");
	next(); // Pass control to the next middleware or route handler
});
```

#### 2. Error Middleware

- When an error is encountered, Express automatically invokes the nearest error-handling middleware with the error object.
- When an error occurs, Express skips remaining route handlers and middleware, invoking the error-handling middleware.
- The error handler must be defined using app.use() with four parameters: err, req, res, and next. This is necessary for Express to recognize it as an error-handling middleware. If the next parameter is omitted, Express will treat the function as a regular middleware instead of an error handler, which is why all four parameters are required.
- errorHandler must be defined using `app.use()` with four parameters : `err`, `req`, `res` and `next`. All 4 parameters are required for Express to distinguish between normal middleware and error-handling middleware.
- Purpose: Catches and handles errors that occur during the processing of requests.
- Location: It must be defined after all the routes and other middleware. This is because Express processes middleware and routes in the order they are defined.
- Function: Takes err, req, res, and next as parameters. Logs the error, sets the HTTP status code, and sends a JSON response with error details.

```ts
// If Route has `err` parameter that is the errorMiddleware

// Use errorMiddleware after all Routes and Middlewares
app.use((err: Error, req: Request, res: Response) => {
	console.error("I am Error Middleware");
	res.status(500).json({ message: "This is Error Message" });
});
```

</details>

---

<details>
<summary>Error Handler</summary>

## Error Handler

- Express catches all errors that occur while running route handlers and middleware.

## Types of Errors

1. Client Errors
1. Server Errors
1. Database Errors

### 1. Client Error Responses

- 400 : Bad Request
- 401 : Unauthorized
- 403 : Forbidden
- 404 : Not Found
- 429 : Too Many Requests

### 2. Server Errors

- 500 : Internal Server Error

### 3. Database Errors

### Ways to Handle Errors

1. Centralized Error Handling: Use a single error middleware function to handle errors globally within your application. This ensures consistency and makes it easier to manage and troubleshoot errors.

</details>

---

<details>
<summary>next</summary>

## next

- next parameter in express
- next parameter is used to give control to the next function

</details>

---

<details>
<summary>instanceof</summary>

## instanceof

</details>

---

<details>
<summary>Documentation</summary>

## Documentation

- Docs : [https://medium.com/@mohsinogen/simplified-guide-to-setting-up-a-global-error-handler-in-express-js-daf8dd640b69]
- Error Handler : [https://medium.com/@vdsnini/handling-errors-with-middleware-in-node-js-84555d48ed29]
- Express Error Doc : [https://expressjs.com/en/guide/error-handling.html]

</details>

---
