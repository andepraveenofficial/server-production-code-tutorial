import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedProducts = async () => {
    try {
        // Delete all existing products
        await prisma.product.deleteMany({});

        // Generate 100 products with unique names and random prices
        const products = Array.from({ length: 100 }, (_, index) => ({
            name: `Product ${index + 1}`,
            price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
        }));

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