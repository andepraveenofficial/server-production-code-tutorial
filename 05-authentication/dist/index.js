"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const port = 5000;
console.log(process.env.PORT);
/* -----> Start the Server <----- */
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/* -----> Routes <----- */
app.get("/", (req, res) => {
    console.log("I am Home Route");
    res.send("I am Home route");
});
