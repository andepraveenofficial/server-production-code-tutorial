import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";
import { applyQueryOptions } from "./utils/query.utils";

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

/* -----> Database Connection <------ */
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDbConnection();

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

/* -----> QueryParams <----- */

// without query params
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

// with query params
app.get("/products", async (req: Request, res: Response) => {
  try {
    const paginatedProducts = await applyQueryOptions(
      req,
      prisma.product,
      ["name"], // searchable fields
      ["name", "price", "createdAt"] // sortable fields
    );

    res.status(200).json(paginatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});