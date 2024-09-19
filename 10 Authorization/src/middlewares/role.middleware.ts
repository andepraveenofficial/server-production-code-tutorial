import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";

const roleMiddleware = (allowedRoles: string[]) => {
  console.log("I am roleMiddleware");
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // Check if user object exists
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not authenticated" });
      }

      // Check if userRole exists
      if (!req.user.userRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: User role not found" });
      }

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(req.user.userRole)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }

      // The user is authorized, proceed to the next middleware
      next();
    } catch (error) {
      console.error("Error in role middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default roleMiddleware;
