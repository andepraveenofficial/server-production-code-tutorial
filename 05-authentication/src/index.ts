import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const port = 5000;
console.log(process.env.PORT);

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

// Signup
app.get("/signup", (req: Request, res: Response) => {
  console.log("I am Signup Route");
  res.send("I am Signup Route");
});

// Signin
app.get("/signin", (req: Request, res: Response) => {
  console.log("I am Signin Route");
  res.send("I am Signin Route");
});
