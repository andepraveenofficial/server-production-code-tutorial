import express, { Request, Response } from "express";
import apiRoutes from "./api";

const app = express();

/* -----> Express Built-in Middlewares <----- */
app.use(express.json());

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

// API Versions
app.use("/api", apiRoutes);

export default app;
