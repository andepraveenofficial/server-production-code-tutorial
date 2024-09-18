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
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./config/prisma"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
// console.log(process.env.PORT);
// const port = 5000;
const port = process.env.PORT;
/* -----> Start the Server <----- */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/* -----> Routes <----- */
app.get("/", (req, res) => {
    console.log("I am Home Route");
    res.send("I am Home route");
});
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all products from the database
        const products = yield prisma_1.default.product.findMany({});
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching products" });
    }
}));
