import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/prisma";

export interface AuthRequest extends Request {
  user?: {
    userId: string; // Attach userId to the request object
    userEmail: string; // Attach userEmail to the request object
    userRole: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  /*
    ------> Authorization Header JWt token <----- 

  // Get the Authorization header value
  const authHeader = req.headers.authorization;

  // Ensure token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  // Extract token
  const token: string = authHeader && authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'

   -----> Cookie Storage JWT token <----- 

  const token: string = req.cookies.refreshToken;
  
  */
  const token: string =
    req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify JWT token
    const secret = process.env.JWT_REFRESH_TOKEN_CODE as string; // Use the secret key from env
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      return res.status(403).json({ error: "Invalid token!" });
    }

    // Fetch user from the database to validate the refresh token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { Role: true },
    });

    console.log(user);

    if (!user || user.deletedAt) {
      return res.status(404).json({ error: "User not found or deleted!" });
    }

    // Validate refresh token
    if (user.refreshToken !== token) {
      return res.status(403).json({ error: "Invalid refresh token!" });
    }

    // Attach userId and userEmail to request object
    req.user = {
      userId: user.id,
      userEmail: user.email,
      userRole: user.Role.name, // Attach user role to the request object
    };

    next(); // Continue to the next middleware/route
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
