import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../config/prisma';
import ApiError from '../handlers/apiError.handler';
import asyncHandler from '../handlers/async.handler';

export interface AuthRequest extends Request {
  user?: {
    userId: string; // Attach userId to the request object
    userEmail: string; // Attach userEmail to the request object
    userRole: string;
  };
}

export const authMiddleware = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string =
      req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];

    console.log(token);

    if (!token) {
      throw new ApiError(401, 'No token provided');
    }

    // Verify JWT token
    const secret = process.env.JWT_REFRESH_TOKEN_CODE as string; // Use the secret key from env
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new ApiError(403, 'Invalid token!');
    }

    // Fetch user from the database to validate the refresh token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { Role: true },
    });

    console.log(user);

    if (!user || user.deletedAt) {
      throw new ApiError(404, 'User not found or deleted!');
    }

    // Validate refresh token
    if (user.refreshToken !== token) {
      throw new ApiError(403, 'Invalid refresh token!');
    }

    // Attach userId and userEmail to request object
    req.user = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.Role.name, // Attach user role to the request object
    };

    next(); // Continue to the next middleware/route
  },
);

export default authMiddleware;
