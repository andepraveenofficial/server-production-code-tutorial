import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed data for products
  const products = [
    {
      name: "Laptop",
      price: 999.99,
    },
    {
      name: "Smartphone",
      price: 699.99,
    },
    {
      name: "Tablet",
      price: 499.99,
    },
  ];

  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
