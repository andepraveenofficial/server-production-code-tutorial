export interface CreateProductDto {
  name: string;
  price: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
}
