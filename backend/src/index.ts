import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
});
