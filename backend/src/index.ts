import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import taskRouter from './routes/taskRoutes';
import studentTaskRoutes from "./routes/studentTaskRoutes";




dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/tasks', taskRouter);
app.use('/allStudents',studentTaskRoutes)



connectDB().then(() => {
  app.listen(PORT, () => console.log(` Server running http://localhost:${PORT}`));
});
