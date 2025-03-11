import express, { NextFunction, Request, Response } from "express";
import {createTaskController, deleteTaskController, getTasksByStudentId, getTasksByTeacherId, updateTaskController, updateTaskStatusController } from  '../controllers/taskController';
import { authenticateUser } from "../middleware/authMiddleware"; 
const router = express.Router();


router.post("/create", authenticateUser, createTaskController);

 
router.get("/teacher/:teacherId", authenticateUser, getTasksByTeacherId);


router.get("/student/:studentId", authenticateUser, getTasksByStudentId);


router.put("/:taskId", authenticateUser,updateTaskController);

router.delete("/:id",authenticateUser, deleteTaskController);

router.put("/status/:taskId", authenticateUser, updateTaskStatusController);

export default router;