import { Request, Response } from "express";
import { ProductModel } from "../models";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import prisma from "../../../config/prisma";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductModel[] = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
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
};

export const updateProduct = async (req: Request, res: Response) => {
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
};

export const updateProductPart = async (req: Request, res: Response) => {
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
};

export const deleteProduct = async (req: Request, res: Response) => {
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
};
