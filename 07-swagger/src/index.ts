import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../swagger-output.json";
import ProductRouts from "./routes/product.route";
import cors from "cors";

const app = express();
const port = 5000;

app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerOptions));

/* -----> Middlewares <----- */
app.use(cors());

/* -----> Start the Server <----- */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* -----> Routes <----- */

app.get("/", (req: Request, res: Response) => {
  console.log("I am Home Route");
  res.send("I am Home route");
});

app.use("/products", ProductRouts);
