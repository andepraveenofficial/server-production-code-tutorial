import { Request, Response, NextFunction } from "express";
import ApiError from "./apiError.handler";

const errorMiddleware = (
  err: ApiError, // Use the extended interface
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode ?? 500;
  const message = err.message ?? "Internal Server Error";
  const success = false;
  const data = null;

  if (process.env.NODE_ENV === "production") {
    console.log("I am errorMiddleware");
  }

  const response = { status, message, success, data };
  res.status(status).json(response);
};

export default errorMiddleware;
