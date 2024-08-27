import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedProducts = async () => {
  // Delete all existing products
  await prisma.product.deleteMany();

  // Fetch users for associating with products
  const users = await prisma.user.findMany();

  // Products to seed
  const products = [
    {
      name: "Product A",
      price: 29.99,
      userId: users[0].id,
    },
    {
      name: "Product B",
      price: 49.99,
      userId: users[0].id,
    },
    {
      name: "Product C",
      price: 19.99,
      userId: users[1].id,
    },
  ];

  // Create new products
  await prisma.product.createMany({
    data: products,
  });

  console.log("Products seeded successfully");
};
