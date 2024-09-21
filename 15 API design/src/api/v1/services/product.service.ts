import { ProductModel } from "../models";
import { CreateProductDto, UpdateProductDto } from "../dtos";
import { productRepository } from "../repositories";

export const getAllProducts = async (): Promise<ProductModel[]> => {
  return await productRepository.findAll();
};

export const createProduct = async (
  productData: CreateProductDto
): Promise<ProductModel> => {
  return await productRepository.create(productData);
};

export const updateProduct = async (
  id: string,
  updateData: UpdateProductDto
): Promise<ProductModel> => {
  return await productRepository.update(id, updateData);
};

export const updateProductPart = async (
  id: string,
  updates: UpdateProductDto
): Promise<ProductModel> => {
  return await productRepository.update(id, updates);
};

export const deleteProduct = async (id: string): Promise<ProductModel> => {
  return await productRepository.softDelete(id);
};
