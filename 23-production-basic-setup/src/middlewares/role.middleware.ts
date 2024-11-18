import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import ApiResponse from '../handlers/apiResponse.handler';
import ApiError from '../handlers/apiError.handler';
import { InternalError } from '../handlers/apiCustomError.handler';

const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Check if user object exists
      if (!req.user) {
        new ApiResponse(res, 401, 'Unauthorized: User not authenticated', null);
        return;
      }

      // Check if userRole exists
      if (!req.user.userRole) {
        new ApiResponse(res, 403, 'Forbidden: User role not found', null);
        return;
      }

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(req.user.userRole)) {
        new ApiResponse(res, 403, 'Forbidden: Insufficient permissions', null);
        return;
      }

      // The user is authorized, proceed to the next middleware
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalError();
      }
      throw error;
    }
  };
};

export default roleMiddleware;
