"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
// export interface AuthRequest extends Request {
//   user?: {
//     userId: string; // Attach userEmail to the request object
//     userEmail: string; // Attach userEmail to the request object
//   };
// }
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    const token = req.cookies.refreshToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        // Verify JWT token
        const secret = process.env.JWT_REFRESH_TOKEN_CODE; // Use the secret key from env
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || !decoded.userId) {
            return res.status(403).json({ error: "Invalid token!" });
        }
        // Fetch user from the database to validate the refresh token
        const user = yield prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
        });
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
        };
        next(); // Continue to the next middleware/route
    }
    catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
});
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
