import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import errorMiddleware from "./handlers/error.handler";
import ApiError from "./handlers/apiError.handler";

dotenv.config({ path: "./.env" });

const app = express();
const port = 5000;

/* -----> Start the server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Middlewares <----- */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Normal Middleware
  console.log("Normal Middleware executed for every request");
  next(); // Pass control to the next middleware or route handler
});

/* -----> Routes <----- */

// 00 Test
app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

// 01 next parameter
app.get(
  "/next",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("I am middleA");
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log("B");
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log("C");
    next();
  },
  (req: Request, res: Response) => {
    console.log("D");
    res.send("I am next route");
  }
);

/* -----> Error Routes <----- */
app.get("/error1", (req: Request, res: Response) => {
  //  Express automatically catches the error and passed to the error-handling middleware.
  console.log("I am Error1 Route");
  throw new Error("I am Error");
});

app.get("/error2", (req: Request, res: Response, next: NextFunction) => {
  // you manually catch the error and pass it to the error-handling middleware.
  console.log("I am Error2 Route");
  try {
    const isAvailable = false;
    if (isAvailable) {
      throw new Error("I am Error");
    }
  } catch (error) {
    // error pass to nearest errorMiddleware
    next(error);
  }
});

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
      throw new ApiError(404, "User Not Found");
    }
  } catch (err) {
    next(err); // Pass the error to error-middleware
  }
});

/* -----> Error Handling Middleware <----- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("I am passing this Error to next error-middleware");
  next(err); // Pass the error to another error-handling middleware
});

app.use(errorMiddleware);
