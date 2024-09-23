import { PrismaClient } from "@prisma/client";
import { seedUsers, seedProducts } from "./index";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedUsers();
    await seedProducts();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    console.log("Seeding completed!");
    process.exit(0);
  }
};


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });