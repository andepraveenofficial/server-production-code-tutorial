import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import errorMiddleware from "./handlers/error.handler";
import ApiError from "./handlers/apiError.handler";
import { NotFoundError } from "./advancedHandlers/apiError.advanced.handler";
import ApiResponse from "./handlers/apiResponse.handler";

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
app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("Home");
});

// next parameter
app.get(
  "/next",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("A");
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

/* -----> Successful Api Response <----- */

app.get("/product", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("I am Product Route");

    const isAvailable = true;

    if (isAvailable) {
      const productData = {
        id: 1,
        name: "Sample Product",
        price: 99.99,
      };

      const response = new ApiResponse(
        200,
        productData,
        "Product retrieved successfully"
      );
      res.json(response);
    } else {
      throw new ApiError(400, "Product Not Found");
    }

    // Send the ApiResponse instance as JSON
  } catch (error) {
    next(error);
  }
});
/* -----> Error Routes <----- */
app.get("/error", (req: Request, res: Response) => {
  console.log("I am Error Route");
  throw new Error("I am Error");
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
      throw new ApiError(500, "User Not Found");
    }
  } catch (err) {
    next(err); // Pass the error to error-middleware
  }
});

/* -----> Advanced Error Handlers <----- */
app.get("/customer", (req: Request, res: Response, next: NextFunction) => {
  console.log("I am User Customer");
  try {
    const isAvailable = false;
    if (isAvailable) {
      const user = {
        name: "Dhoni",
        country: "India",
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
