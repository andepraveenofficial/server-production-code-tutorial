import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedUsers = async () => {
  // Delete all existing users
  await prisma.user.deleteMany();

  // Hash the password
  const password = await bcrypt.hash('password123', 10);

  // Fetch roles for associating with users
  const roles = await prisma.role.findMany();

  // Users to seed
  const users = [
    {
      firstName: 'admin',
      lastName: 'one',
      email: 'admin@example.com',
      password,
      roleId: roles[0].id, // Assuming "ADMIN" role
    },
    {
      firstName: 'user',
      lastName: 'one',
      email: 'user@example.com',
      password,
      roleId: roles[1].id, // Assuming "USER" role
    },
    {
      firstName: 'guest',
      lastName: 'one',
      email: 'guest@example.com',
      password,
      roleId: roles[2].id, // Assuming "GUEST" role
    },
  ];

  // Create new users
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('🌱  Users seeded successfully');
};
