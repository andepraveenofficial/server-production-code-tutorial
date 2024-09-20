import { Router } from "express";

import { productController } from "../controllers";

const router = Router();

router
  .route("/")
  .get(productController.getAllProducts) // GET /products - Fetch all products
  .post(productController.createProduct); // POST /products - Create a new product

router
  .route("/:id")
  .put(productController.updateProduct) // PUT /products/:id - Update a product (full replacement)
  .patch(productController.updateProductPart) // PATCH /products/:id - Update part of a product (partial update)
  .delete(productController.deleteProduct); // DELETE /products/:id - Soft delete a product by setting deletedAt

export default router;
