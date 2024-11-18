import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { handlePrismaError } from './prismaError.handler';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

// asyncHandler is used to Eliminates Redundant "try/catch" Blocks
// Decrease the boilerplate and maintain clean code

const asyncHandler = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Handle Prisma Errors
      if (
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientValidationError ||
        error instanceof Prisma.PrismaClientInitializationError
      ) {
        return next(handlePrismaError(error));
      }

      return next(error);
    }
  };
};

export default asyncHandler;
