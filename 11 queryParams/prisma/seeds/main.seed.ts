import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create products with more manual control
  const products = [];

  for (let i = 1; i <= 100; i++) {
    products.push({
      name: `Product ${i}`, // Unique product names
      price: 100 + i * 10, // Gradual price increments for control
    });
  }

  // Insert products one by one for better custom control (e.g., validations)
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
