import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedProducts = async () => {
  // Delete all existing products
  await prisma.product.deleteMany();

  // Products to seed
  const products = [
    {
      name: "Product A",
      price: 10,
    },
    {
      name: "Product B",
      price: 20,
    },
    {
      name: "Product C",
      price: 30,
    },
  ];

  // Create new products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Products seeded successfully");
};
