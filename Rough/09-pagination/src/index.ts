import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import prisma from "./config/prisma";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 5000;

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

/* -----> Pagination <----- */
app.get("/products", async (req: Request, res: Response) => {
  console.log("I am Products Route");
  try {
    const data = await prisma.product.findMany();
    res.json(data);
  } catch (error) {
    throw new Error("Getting data Error");
  }
});
