"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authController_1 = __importDefault(require("./controllers/authController")); // Path to your authController
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Ensure body-parser middleware is set up
// Use the routes from authController
app.use('/auth', authController_1.default); // Prefix routes with `/auth`
app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
});
