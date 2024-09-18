import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create a new product
router.post("/", async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  */
  try {
    const { name, price } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Get all products
router.get("/", async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  */
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  */
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

// Update a product by ID
router.put("/:id", async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Users']
  */
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, price },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req: Request, res: Response) => {
  /* 
  #swagger.tags = ['Products']
  */
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
