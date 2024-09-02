import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedProducts = async () => {
  try {
    // Delete all existing products
    await prisma.product.deleteMany();

    // Products to seed
    const products = [
      {
        name: "Product A",
        price: 29.99,
      },
      {
        name: "Product B",
        price: 49.99,
      },
      {
        name: "Product C",
        price: 19.99,
      },
    ];

    // Create new products
    await prisma.product.createMany({
      data: products,
    });

    console.log("Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await prisma.$disconnect();
  }
};
