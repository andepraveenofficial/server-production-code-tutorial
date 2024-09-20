import express, { Request, Response } from "express";
import prisma from "./config/prisma";
import path from "path";
import dotenv from "dotenv";

/* -----> multer <----- */
import multer from "multer";
import fs from "fs";

// Define the uploads directory
const uploadsDir = path.join(__dirname, "../uploads");

// Check if the uploads directory exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Uploads directory created.");
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Initialize multer with storage settings
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Allow only jpg and png files
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed"));
    }
  },
});

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT ?? 5000;

/* -----> Express Built-in Middlewares <----- */
app.use(express.json()); // handle json data
app.use(express.urlencoded({ extended: true })); // handle url encoded data

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

app.post(
  "/products",
  upload.single("productImage"),
  async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    try {
      // Extract product data from the request body
      const { name, price } = req.body;

      // Validate the required fields
      if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
      }

      // Create a new product in the database
      const product = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
        },
      });

      // Respond with the created product
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);

      res
        .status(500)
        .json({ error: "An error occurred while creating the product" });
    }
  }
);
