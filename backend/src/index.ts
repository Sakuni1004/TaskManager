import express from "express";
import dotenv from "dotenv";
import connectDB from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
