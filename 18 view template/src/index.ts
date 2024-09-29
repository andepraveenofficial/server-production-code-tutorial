import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

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

// Middleware for JSON parsing (optional)
app.use(express.json());

/* -----> Template Engine <----- */
import viewRoutes from "./routes/view.route";

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory where your EJS templates are located
app.set("views", path.join(__dirname, "views"));

app.use("/", viewRoutes);

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

app.get("/api", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

app.get("/api/products", async (req: Request, res: Response) => {
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

/* -----> Template Engine <----- */
// app.get("/view", (req, res) => {
//   res.render("index");
// });
