import { Router, Request, Response } from "express";
import prisma from "./../config/prisma"; // Adjust the path based on your project structure
import { CreateProductDto, UpdateProductDto } from "./../dtos"; // Import DTOs// Import DTOs
import { ProductModel } from "../models"; // Import Product model

const router = Router();

// GET /products - Fetch all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products: ProductModel[] = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});

// POST /products - Create a new product
router.post("/", async (req: Request, res: Response) => {
  const productData: CreateProductDto = req.body;
  try {
    const newProduct: ProductModel = await prisma.product.create({
      data: productData,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
});

// PUT /products/:id - Update a product (full replacement)
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdateProductDto = req.body;
  try {
    const updatedProduct: ProductModel = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
});

// PATCH /products/:id - Update part of a product (partial update)
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates: UpdateProductDto = req.body;
  try {
    const updatedProduct: ProductModel = await prisma.product.update({
      where: { id },
      data: updates,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error partially updating product:", error);
    res.status(500).json({
      error: "An error occurred while partially updating the product",
    });
  }
});

// DELETE /products/:id - Soft delete a product by setting deletedAt
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct: ProductModel = await prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
});

export default router;
