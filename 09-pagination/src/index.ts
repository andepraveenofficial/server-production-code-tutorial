import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 5000;

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

/* -----> Pagination <----- */
app.get("/products", (req: Request, res: Response) => {
  console.log("I am Products Route");
  res.send("I am Products route");
});
