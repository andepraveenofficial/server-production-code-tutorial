import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import limiter from "./config/ratelimiter";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

// app.use(cors()); // Allows all origins by default
// CORS options
const whitelist = ["https://www.yoursite.com", "http://127.0.0.1:5000", "http://localhost:5000"]
const corsOptions = {
  // origin: "http://localhost:3000", // Allow only requests from this origin
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // CORS origin
app.use(helmet()); // Use Helmet to secure the app with default settings
app.use(limiter); // Use limiter to control to call the APIs

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    // Fetch all products from the database
    const products = await prisma.product.findMany({});

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});
