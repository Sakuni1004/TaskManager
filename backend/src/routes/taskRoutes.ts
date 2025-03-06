import express, { Request, Response } from "express";
import {createTask, getTasksByTeacher, updateTaskStatus, deleteTask, getTasksByStudent } from  '../controllers/taskController';

const router = express.Router();


router.post("/create", createTask);


router.get("/teacher/:teacherId", getTasksByTeacher);


router.put("/update/:taskId", updateTaskStatus);


router.delete("/delete/:taskId", deleteTask);


router.get("/:studentId", getTasksByStudent);


export default router;
