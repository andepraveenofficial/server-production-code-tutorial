import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedRoles = async () => {
  // Delete all existing roles
  await prisma.role.deleteMany();

  // Roles to seed
  const roles = [{ name: "MANAGER" }, { name: "ADMIN" }, { name: "USER" }];

  // Create new roles
  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  console.log("Roles seeded successfully");
};
