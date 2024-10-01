interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export default Product;
