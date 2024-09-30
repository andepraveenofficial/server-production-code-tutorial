# Built-In Middlewares

### Express Built-In Middlewares

1. `express.json()`
2. `express.static()`

```ts
// parse incoming JSON payloads and make it available in req.body
app.use(express.json());

// Handle Static files
app.use(express.static(path.join(__dirname, '../', public)));

// Handle Routes
app.use('api/v1', v1Routes);
```
