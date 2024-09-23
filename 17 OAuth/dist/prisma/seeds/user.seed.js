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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all existing users
    yield prisma.user.deleteMany();
    // Hash the password
    const password = yield bcrypt_1.default.hash("password123", 10);
    // Users to seed
    const users = [
        {
            firstName: "user1",
            lastName: "one",
            email: "user1one@example.com",
            password,
        },
        {
            firstName: "user2",
            lastName: "two",
            email: "user2two@example.com",
            password,
        },
        {
            firstName: "user3",
            lastName: "three",
            email: "user3three@example.com",
            password,
        },
    ];
    // Create new users
    for (const user of users) {
        yield prisma.user.create({
            data: user,
        });
    }
    console.log("Users seeded successfully");
});
exports.seedUsers = seedUsers;
