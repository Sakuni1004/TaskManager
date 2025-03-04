import { Request, Response } from "express";
import Task from "../models/Task";
import jwt from "jsonwebtoken";


export const createTask = async (req: Request, res: Response): Promise<any> => {
  const { title, description, dueDate, studentId } = req.body;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const teacherId = decoded.id;

    const task = new Task({
      title,
      description,
      dueDate,
      teacherId,
      studentId,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// Get all tasks for a specific teacher (requires authentication)
export const getTasksByTeacher = async (req: Request, res: Response): Promise<void> => {
  const teacherId = req.params.teacherId;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    if (decoded.id !== teacherId) {
      res.status(403).json({ message: "Not authorized to view these tasks" });
      return;
    }

    const tasks = await Task.find({ teacherId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// Update task status (e.g., completed or pending)
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

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const taskId = req.params.taskId;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    if (decoded.id !== task.teacherId.toString()) {
      res.status(403).json({ message: "Not authorized to delete this task" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};
