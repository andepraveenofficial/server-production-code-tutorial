import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import ApiError from '../handlers/apiError.handler';
import asyncHandler from '../handlers/async.handler';

const roleMiddleware = (allowedRoles: string[]) => {
  console.log('I am roleMiddleware');
  return asyncHandler(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      // Check if user object exists
      if (!req.user) {
        throw new ApiError(401, 'Unauthorized: User not authenticated');
      }

      // Check if userRole exists
      if (!req.user.userRole) {
        throw new ApiError(403, 'Forbidden: User role not found');
      }

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(req.user.userRole)) {
        throw new ApiError(403, 'Forbidden: Insufficient permissions');
      }

      // The user is authorized, proceed to the next middleware
      next();
    },
  );
};

export default roleMiddleware;
