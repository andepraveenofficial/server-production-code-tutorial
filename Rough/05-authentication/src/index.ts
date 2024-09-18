import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import prisma from "./config/prisma";
import authMiddleware from "./middlewares/auth.middleware";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 5000;
// console.log(process.env.PORT);

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Middlewares <----- */
app.use(express.json());
app.use(cookieParser());

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

app.post("/signup", async (req: Request, res: Response) => {
  console.log("I am Signup Route");
  try {
    const { email, password, name } = req.body;

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
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "An error occurred during signup" });
  }
});

// Signin
app.post("/signin", async (req: Request, res: Response) => {
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

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate jwt Tokens
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      process.env.JWT_ACCESS_TOKEN_CODE ?? "myjwtaccesstoken", // Secret Key
      {
        expiresIn: "1h", // Token will expire in 1 hour
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email }, // Payload
      process.env.JWT_ACCESS_TOKEN_CODE ?? "myjwtaccesstoken", // Secret Key
      {
        expiresIn: "7d", // Token will expire in 1 hour
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
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
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
          name: user.name,
        },
      });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ error: "An error occurred during signin" });
  }
});

/* -----> authMiddleware <----- */
app.get("/products", authMiddleware, async (req: Request, res: Response) => {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany({
      include: {
        user: true, // Include user information if needed
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});

app.post("/signout", async (req: Request, res: Response) => {
  try {
    // Get the user ID from the request object (assuming you store user ID in the request by auth middleware)
    const userId = (req as any).userId;

    if (userId) {
      // Optionally, remove the refresh token from the database
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
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

/* -----> Cookie <----- */
//JSON object to be added to cookie
let users = {
  name: "Praveen",
  Age: "28",
};

//Route for adding cookie
app.get("/setuser", (req, res) => {
  console.log("I am setuser Route");
  res.cookie("userData", users);
  res.send("user data added to cookie");
});

//Iterate users data from cookie
app.get("/getuser", (req, res) => {
  console.log("I am getuser Route");
  //shows all the cookies
  res.send(req.cookies);
});
