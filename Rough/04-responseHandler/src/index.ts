import express, { NextFunction, Request, response, Response } from "express";
import errorMiddleware from "./handlers/error.handler";
import ApiError from "./handlers/apiError.handler";
import ApiResponse from "./handlers/apiResponse.handler";

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

/* -----> Response Handle Routes <----- */

// Error Response

app.get("/user1", (req: Request, res: Response, next: NextFunction) => {
  console.log("I am User1 Route");
  try {
    const isAvailable = false;
    if (isAvailable) {
      const data = {
        name: "Praveen",
        age: "ande",
      };
      new ApiResponse(res, 200, "Retrives User Details", data);
    } else {
      throw new ApiError(404, "User Not Found");
    }
  } catch (err) {
    next(err); // Pass the error to error-middleware
  }
});

// Success Response
app.get("/user2", (req: Request, res: Response, next: NextFunction) => {
  console.log("I am User2 Route");
  try {
    const isAvailable = true;
    if (isAvailable) {
      const data = {
        name: "Praveen",
        age: "ande",
      };
      new ApiResponse(res, 200, "Retrives User Details", data);
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
