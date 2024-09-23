import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

/* -----> Authentication <----- */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/auth.middleware";
import { IUser } from "./interfaces/user.interface";

/* -----> OAuth <----- */
import passport from "passport";
import session from "express-session";

/* -----> OAuth Configuration<----- */
import "./config/passport";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Express Built-In Middlewares <----- */
// Handle JSON data
app.use(express.json());

/* ----->Session Storage <----- */
/* -----> Session Storage <----- */
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "mySecretCode",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

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
app.post("/auth/signup", async (req: Request, res: Response) => {
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
app.post("/auth/signin", async (req: Request, res: Response) => {
  console.log("I am Signin Route");
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password) {
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else if (!user.googleId) {
      return res.status(400).json({ error: "Invalid credentials" });
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

/* -----> authMiddlewares <----- */

// without authMiddleware
app.get("/products1", async (req: Request, res: Response) => {
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

// with authMiddleware -> Authorization Header
app.get("/products2", authMiddleware, async (req: Request, res: Response) => {
  console.log("I am products2 Route");

  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany({});

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products2:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products2" });
  }
});

// with authMiddleware -> Cookie Storage
app.get("/products3", authMiddleware, async (req: Request, res: Response) => {
  console.log("I am products3 Route");
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany({});

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products2:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products2" });
  }
});

// Sigout

app.get("/signout", authMiddleware, async (req: Request, res: Response) => {
  console.log("I am sigout Route");
  try {
    // Get the user ID from the request object (assuming you store user ID in the request by auth middleware)
    const userId: string | undefined = (req.user as IUser)?.userId;

    if (userId) {
      // Optionally, remove the refresh token from the database
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Signout successful" });
  } catch (error) {
    console.error("Error signing out:", error);
    res.status(500).json({ error: "An error occurred during signout" });
  }
});

/* -----> Google OAuth routes <----- */
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Ensure user is authenticated
      if (!req.user) {
        res.status(400).json({ error: "User not authenticated" });
        return;
      }

      // Extract the email from req.user (assuming it's set by the Passport strategy)
      const email = (req.user as { email?: string }).email;

      if (!email) {
        res.status(400).json({ error: "User email not available" });
        return;
      }

      // Fetch user from the database by email
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
      }

      // If the user has a password, verify it
      const password = req.body.password; // Assuming password is coming from req.body
      if (user.password && password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          res.status(400).json({ error: "Invalid credentials" });
          return;
        }
      } else if (!user.googleId) {
        res.status(400).json({ error: "Invalid credentials" });
        return;
      }

      // Generate refresh token
      const refreshToken = jwt.sign(
        { userId: user.id }, // Payload
        process.env.JWT_REFRESH_TOKEN_CODE as string, // Secret Key
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY as string, // Expiry time
        }
      );

      // Store refresh token in database
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken }, // Ensure your User model has a refreshToken field
      });

      console.log("Updated User : ", updatedUser);
      // Send response with refresh token and user details
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
      console.error("Error during Google OAuth callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
