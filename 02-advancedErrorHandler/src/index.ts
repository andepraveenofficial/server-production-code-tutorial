import express, { NextFunction, Request, Response } from "express";
import { NotFoundError } from "./handlers/apiError.handler";
import errorMiddleware from "./handlers/error.handler";

const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

/* -----> Error Routes <----- */

app.get("/user", (req: Request, res: Response, next: NextFunction) => {
  console.log("I am User Route");
  try {
    const isAvailable = false;
    if (isAvailable) {
      const user = {
        name: "Praveen",
        age: "ande",
      };
      res.send({ user: user });
    } else {
      throw new NotFoundError("Customer Not Found");
    }
  } catch (err) {
    next(err); // Pass the error to error-middleware
  }
});

// /* -----> Error Handling Middleware <----- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("I am passing this Error to next error-middleware");
  next(err); // Pass the error to another error-handling middleware
});

app.use(errorMiddleware);
