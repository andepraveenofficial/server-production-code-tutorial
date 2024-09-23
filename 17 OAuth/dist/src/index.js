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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./config/prisma"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
/* -----> Authentication <----- */
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
/* -----> OAuth <----- */
// import passport from "./config/passport";
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
// console.log(process.env.PORT);
// const port = 5000;
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
/* -----> Express Built-In Middlewares <----- */
// Handle JSON data
app.use(express_1.default.json());
/* -----> Third Party Packages <----- */
app.use((0, cookie_parser_1.default)());
/* -----> Start the Server <----- */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/* -----> Routes <----- */
app.get("/", (req, res) => {
    console.log("I am Home Route");
    res.send("I am Home route");
});
/* -----> Auth Routes <----- */
// Signup
app.post("/auth/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I am Signup Route");
    try {
        const data = req.body;
        const { email, password } = data;
        // Check if the user already exists
        const existingUser = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new user
        const newUser = yield prisma_1.default.user.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "An error occurred during signup" });
    }
}));
// Signin
app.post("/auth/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I am Signin Route");
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield prisma_1.default.user.findUnique({
            where: { email },
        });
        // Check if user exists
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        // Verify the password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id }, // Payload
        process.env.JWT_REFRESH_TOKEN_CODE, // Secret Key
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY, // Token will expire in 7 days
        });
        // Store the refresh token in the database (optional but recommended)
        yield prisma_1.default.user.update({
            where: { id: user.id },
            data: { refreshToken }, // Assuming you've added a refreshToken field in the User model
        });
        // Successful login
        res
            .status(200)
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
            .json({
            message: "Signin successful",
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    }
    catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ error: "An error occurred during signin" });
    }
}));
/* -----> authMiddlewares <----- */
// without authMiddleware
app.get("/products1", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I am products1 Route");
    try {
        // Fetch all products from the database
        const products = yield prisma_1.default.product.findMany({});
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products1:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching products1" });
    }
}));
// with authMiddleware -> Authorization Header
app.get("/products2", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I am products2 Route");
    try {
        // Fetch all products from the database
        const products = yield prisma_1.default.product.findMany({});
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products2:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching products2" });
    }
}));
// with authMiddleware -> Cookie Storage
app.get("/products3", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I am products3 Route");
    try {
        // Fetch all products from the database
        const products = yield prisma_1.default.product.findMany({});
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products2:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching products2" });
    }
}));
// Sigout
app.get("/signout", auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("I am sigout Route");
    try {
        // Get the user ID from the request object (assuming you store user ID in the request by auth middleware)
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (userId) {
            // Optionally, remove the refresh token from the database
            yield prisma_1.default.user.update({
                where: { id: userId },
                data: { refreshToken: null },
            });
        }
        res
            .clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
            .status(200)
            .json({ message: "Signout successful" });
    }
    catch (error) {
        console.error("Error signing out:", error);
        res.status(500).json({ error: "An error occurred during signout" });
    }
}));
/* -----> Cookie <----- */
//JSON object to be added to cookie
let userData = {
    name: "Ande Praveen",
    age: "28",
    city: "Hyderabad",
};
// Route for adding cookie
app.get("/setuser", (req, res) => {
    console.log("I am setuser Route");
    res.cookie("userData", userData);
    res.send("user data added to cookie");
});
// get user data from cookie
app.get("/getuser", (req, res) => {
    console.log("I am getuser Route");
    //shows all the cookies
    res.send(req.cookies);
});
/* -----> Google OAuth routes <----- */
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );
// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );
