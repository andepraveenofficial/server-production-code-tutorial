import express, { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

const router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.originalUrl);
      const products = await prisma.product.findMany();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while fetching products",
      });
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price } = req.body;
      const newProduct = await prisma.product.create({
        data: {
          name,
          price,
        },
      });
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while creating the product",
      });
    }
  });

export default router;
