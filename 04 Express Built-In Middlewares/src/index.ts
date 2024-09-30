import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Express Built-In Middlewares <----- */
// Handle JSON data
app.use(express.json());

// Handle Static files
app.use(express.static(path.join(__dirname, "../", "public")));

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  console.log("--------------");
  console.log(req.ip);
  console.log(req.method);
  console.log(req.originalUrl);
  console.log("--------------");
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

app.use("/api/v1/products", productRoutes);
