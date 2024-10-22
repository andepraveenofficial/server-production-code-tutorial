import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

/* -----> Authentication <----- */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authMiddleware, { AuthRequest } from "./middlewares/auth.middleware";

/* -----> Validation <----- */
import { signupSchema, signinSchema } from "./validations/auth.validation";
import { validate } from "./middlewares/validate.middleware";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Express Built-In Middlewares <----- */
// Handle JSON data
app.use(express.json());

/* -----> Third Party Packages <----- */
app.use(cookieParser());

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */
app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

/* -----> Auth Routes <----- */

// Signup
app.post("/auth/signup", validate(signupSchema), async (req: Request, res: Response) => {
  console.log("I am Signup Route");
  try {
    const data = req.body;

    const { email, password } = data;
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "An error occurred during signup" });
  }
});

// Signin
app.post("/auth/signin", validate(signinSchema), async (req: Request, res: Response) => {
  console.log("I am Signin Route");
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const refreshToken = jwt.sign(
      { userId: user.id }, // Payload
      process.env.JWT_REFRESH_TOKEN_CODE as string, // Secret Key
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY as string, // Token will expire in 7 days
      }
    );

    // Store the refresh token in the database (optional but recommended)
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }, // Assuming you've added a refreshToken field in the User model
    });

    // Successful login
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .json({
        message: "Signin successful",
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "An error occurred during signin" });
  }
});


// products
app.get("/products", async (req: Request, res: Response) => {
  console.log("I am products1 Route");
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany({});

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products1:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products1" });
  }
});
