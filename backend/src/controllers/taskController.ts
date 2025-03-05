import { Request, Response } from "express";
import Task from "../models/Task";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";


// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate, status, studentId } = req.body;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Received task data:", req.body);

  if (!token) {

 
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }



  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    if (!decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    const teacherId = decoded.id; 
    console.log("teacher ID:",teacherId);

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      teacherId, 
      studentId: studentId || undefined, 
    });

    console.log("Created task:", task);

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// Get tasks for a specific teacher
export const getTasksByTeacher = async (req: Request, res: Response): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");



  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const teacherId = decoded.id;

    const tasks = await Task.find({ teacherId }).populate("studentId");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// Update task status
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.body;
  const taskId = req.params.taskId;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (decoded.id !== task.teacherId.toString()) {
      res.status(403).json({ message: "Not authorized to update this task" });
      return;
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const taskId = req.params.taskId;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (decoded.id !== task.teacherId.toString()) {
      res.status(403).json({ message: "Not authorized to delete this task" });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

