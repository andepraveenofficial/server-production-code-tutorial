import { ProductModel } from '../models';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import { productRepository } from '../repositories';
import {
  applyQueryOptions,
  PaginatedResponse,
} from '../../../utils/query.utils';
import prisma from '../../../config/prisma';
import { Request } from 'express';

export const getAllProducts = async (
  req: Request,
): Promise<PaginatedResponse<ProductModel>> => {
  // return await productRepository.findAll();
  const paginatedProducts = await applyQueryOptions<ProductModel>(
    req,
    prisma.product,
    ['name'], // searchable fields
    ['name', 'price', 'createdAt'], // sortable fields
  );

  return paginatedProducts;
};

export const createProduct = async (
  productData: CreateProductDto,
): Promise<ProductModel> => {
  return await productRepository.create(productData);
};

export const updateProduct = async (
  id: string,
  updateData: UpdateProductDto,
): Promise<ProductModel> => {
  return await productRepository.update(id, updateData);
};

export const updateProductPart = async (
  id: string,
  updates: UpdateProductDto,
): Promise<ProductModel> => {
  return await productRepository.update(id, updates);
};

export const deleteProduct = async (id: string): Promise<ProductModel> => {
  return await productRepository.softDelete(id);
};
