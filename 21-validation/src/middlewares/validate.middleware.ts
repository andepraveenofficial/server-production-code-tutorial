// src/middlewares/validate.middleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body); // Validate request body with Zod
    next(); // If validation passes, move to the next middleware
  } catch (error) {
    if (error instanceof ZodError) {
      // If validation fails, return error messages in a standardized format
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          message: err.message,
          path: err.path,
        })),
      });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
