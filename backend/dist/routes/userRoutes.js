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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // Ensure this path is correct for your User model
const router = express_1.default.Router();
// Register a new user
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, email, password: hashedPassword, role });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(400).json({ message: 'Error creating user', error: errorMessage });
    }
}));
// User login route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if the user exists
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Compare password with the stored hash
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, 'your_secret_key', // Use a secret key from environment variables
        { expiresIn: '1h' } // Expiration time of 1 hour
        );
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: 'Error logging in', error: errorMessage });
    }
}));
// Optional: User profile route (e.g., get user by ID)
router.get('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Assuming the user is authenticated and the token is validated in a middleware
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // `req.user` is set after authentication
    try {
        const user = yield User_1.default.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: 'Error fetching user profile', error: errorMessage });
    }
}));
// Optional: Update user information (e.g., change password)
router.put('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, username, password } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // If the password is being updated, hash the new password
        if (password) {
            user.password = yield bcryptjs_1.default.hash(password, 10);
        }
        user.email = email || user.email;
        user.username = username || user.username;
        yield user.save();
        res.status(200).json({ message: 'User profile updated successfully', user });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: 'Error updating user profile', error: errorMessage });
    }
}));
// Optional: Delete user route
router.delete('/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: 'Error deleting user', error: errorMessage });
    }
}));
exports.default = router;
