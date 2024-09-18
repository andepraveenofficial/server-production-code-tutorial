import express, { NextFunction, Request, Response } from "express";
import errorMiddleware from "./handlers/error.handler";
import asyncHandler from "./handlers/async.handler";

const app = express();
const port = 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

// without asyncHandler
app.get("/user1", (req: Request, res: Response, next: NextFunction) => {
  console.log("I am User1 Route");
  try {
    const isAvailable = false;
    if (isAvailable) {
      const user = {
        name: "Praveen",
        age: "ande",
      };
      res.send({ user: user });
    } else {
      throw new Error("User Not Found");
    }
  } catch (err) {
    next(err); // Pass the error to error-middleware
  }
});

// with asyncHandler
app.get(
  "/user2",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am User2 Route");

    const isAvailable = false;

    if (isAvailable) {
      const data = {
        name: "Praveen",
        age: 28,
      };
      res.json(data);
    } else {
      throw new Error("User Not Found");
    }
  })
);
/* -----> Error Handling Middleware <----- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("I am passing this Error to next error-middleware");
  next(err); // Pass the error to another error-handling middleware
});

app.use(errorMiddleware);
