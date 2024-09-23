import express, { NextFunction, Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

/* -----> Error Handlers <----- */
import errorMiddleware from "./handlers/error.handler";
import ApiError from "./handlers/apiError.handler";
import { NotFoundError } from "./handlers/apiCustomError.handler";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Start the Server <----- */
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

app.get(
  "/products1",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products1 Route");
    try {
      const isAvailable = false;
      // Fetch all products from the database

      if (isAvailable) {
        const products = await prisma.product.findMany({});
        res.status(200).json(products);
      } else {
        throw new ApiError(404, "Products Not Found");
      }
    } catch (error) {
      next(error); // Pass the error to error-middleware
    }
  }
);

app.get(
  "/products2",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products2 Route");
    try {
      const isAvailable = false;
      // Fetch all products from the database

      if (isAvailable) {
        const products = await prisma.product.findMany({});
        res.status(200).json(products);
      } else {
        throw new NotFoundError("Products Not Found");
      }
    } catch (error) {
      next(error); // Pass the error to error-middleware
    }
  }
);

/* -----> Error Handling Middleware <----- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("I am passing this Error to next error-middleware");
  next(err); // Pass the error to another error-handling middleware
});

app.use(errorMiddleware);

/* -----> NotFound Route <----- */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route Not available",
  });
});
