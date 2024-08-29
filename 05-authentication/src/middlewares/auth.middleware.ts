import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string; // Attach userId to the request object
}

export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the Authorization header value
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    // Verify the token
    const secret = process.env.JWT_ACCESS_TOKEN_CODE ?? "myjwtaccesstoken"; // Use the secret key from env
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Attach userId from the decoded token to the request object
    req.userId = decoded.userId;

    next(); // Continue to the next middleware/route
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
