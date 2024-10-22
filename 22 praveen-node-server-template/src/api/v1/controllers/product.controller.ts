import { Request, Response } from 'express';
import { productService } from '../services';
import { CreateProductDto, UpdateProductDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import { NotFoundError } from '../../../handlers/apiCustomError.handler';
import asyncHandler from '../../../handlers/async.handler';

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    console.log('I am Products Route');
    const isAvailable = true;
    // Fetch all products from the database

    if (isAvailable) {
      const products = await productService.getAllProducts(req);
      // res.status(200).json(products);
      new ApiResponse(res, 200, 'Successfully Retrives Products', products);
    } else {
      // throw new ApiError(404, 'Products Not Found');
      throw new NotFoundError('Products Not Found');
    }
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const productData: CreateProductDto = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateProductDto = req.body;
    const updatedProduct = await productService.updateProduct(id, updateData);
    res.status(200).json(updatedProduct);
  },
);

export const updateProductPart = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates: UpdateProductDto = req.body;
    const updatedProduct = await productService.updateProductPart(id, updates);
    res.status(200).json(updatedProduct);
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProduct(id);
    res.status(200).json(deletedProduct);
  },
);
