import { Prisma } from '@prisma/client';
import ApiError from './apiError.handler';

type PrismaErrorTypes =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientInitializationError;

export const handlePrismaError = (error: PrismaErrorTypes): ApiError => {
  // Handle Known Request Errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ApiError(
          409,
          `Duplicate entry for ${error.meta?.target as string}`,
        );
      case 'P2025':
        return new ApiError(404, 'Record not found');
      case 'P2003':
        return new ApiError(400, 'Invalid reference: Related record not found');
      case 'P2014':
        return new ApiError(400, 'Invalid ID format or value');
      default:
        return new ApiError(500, 'Database error occurred');
    }
  }

  // Handle Validation Errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return new ApiError(400, 'Invalid data provided');
  }

  // Handle Initialization Errors
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new ApiError(500, 'Database connection error');
  }

  // Default Error
  return new ApiError(500, 'Internal Server Error');
};
