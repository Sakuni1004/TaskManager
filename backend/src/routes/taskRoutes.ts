import express, { Request, Response } from "express";
import {createTask, getTasksByTeacher, updateTaskStatus, deleteTask} from  '../controllers/taskController';
import { authenticateUser } from "../middleware/authMiddleware";
const router = express.Router();


router.post("/create", createTask);


router.get("/teacher/:teacherId", getTasksByTeacher);


router.put("/update/:taskId", updateTaskStatus);


router.delete("/delete/:taskId", deleteTask);

export default router;
