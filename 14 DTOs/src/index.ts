import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";
import { productRoutes } from "./routes";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Express Built-in Middlewares <----- */
app.use(express.json());

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

app.use("/products", productRoutes);
