import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

const errorMiddleware = (
  err: CustomError, // Use the extended interface
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

  res.status(status).json({ status, message, success, data });
};

export default errorMiddleware;
