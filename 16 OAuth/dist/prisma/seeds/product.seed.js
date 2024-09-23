"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all existing products
    yield prisma.product.deleteMany();
    // Fetch users for associating with products
    const users = yield prisma.user.findMany();
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
        yield prisma.product.create({
            data: product,
        });
    }
    console.log("Products seeded successfully");
});
exports.seedProducts = seedProducts;
