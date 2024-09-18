import express, { NextFunction, Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

/* -----> Error Handlers <----- */
import errorMiddleware from "./handlers/error.handler";
import ApiError from "./handlers/apiError.handler";
import { NotFoundError } from "./handlers/apiCustomError.handler";

/* -----> Response Handler <------ */
import ApiResponse from "./handlers/apiResponse.handler";

/* -----> Async Handler <----- */
import asyncHandler from "./handlers/async.handler";

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

/* -----> Response Handle Routes <----- */

// Error -> without asyncHandler
app.get(
  "/products1",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products1 Route");
    try {
      const isAvailable = false;
      // Fetch all products from the database

      if (isAvailable) {
        const products = await prisma.product.findMany({});
        new ApiResponse(res, 200, "Successfully Retrives Products", products);
      } else {
        throw new NotFoundError("Products Not Found");
      }
    } catch (error) {
      next(error); // Pass the error to error-middleware
    }
  })
);

// Error -> with asyncHandler
app.get(
  "/products2",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products2 Route");

    const isAvailable = false;
    // Fetch all products from the database

    if (isAvailable) {
      const products = await prisma.product.findMany({});
      new ApiResponse(res, 200, "Successfully Retrives Products", products);
    } else {
      throw new NotFoundError("Products Not Found");
    }
  })
);

// Success -> without asyncHandler
app.get(
  "/products3",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products3 Route");
    try {
      const isAvailable = true;
      // Fetch all products from the database

      if (isAvailable) {
        const products = await prisma.product.findMany({});
        // res.status(200).json(products);
        new ApiResponse(res, 200, "Successfully Retrives Products", products);
      } else {
        throw new NotFoundError("Products Not Found");
      }
    } catch (error) {
      next(error); // Pass the error to error-middleware
    }
  }
);

// Success -> with asyncHandler
app.get(
  "/products4",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am Products4 Route");
    const isAvailable = true;
    // Fetch all products from the database

    if (isAvailable) {
      const products = await prisma.product.findMany({});
      // res.status(200).json(products);
      new ApiResponse(res, 200, "Successfully Retrives Products", products);
    } else {
      throw new NotFoundError("Products Not Found");
    }
  })
);

/* -----> Error Handling Middleware <----- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("I am passing this Error to next error-middleware");
  next(err); // Pass the error to another error-handling middleware
});

app.use(errorMiddleware);
