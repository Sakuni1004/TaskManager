import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel"; // Import Student model

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, dueDate, status, studentId } = req.body;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Received task data:", req.body);

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    if (!decoded.id) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    const teacherId = decoded.id;
    console.log("Teacher ID:", teacherId);

    const student = await Student.findOne({ studentId });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const allowedStatuses = ["Created", "In Progress", "Completed"];
    if (status && !allowedStatuses.includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const task = new Task({
      title,
      description,
      dueDate,
      status: status || "Created",
      teacherId,
      studentId,
      student: student._id,
    });

    console.log("Created task:", task);

    await task.save();

    await Student.findOneAndUpdate(
      { studentId },
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

// Get tasks for a specific teacher
export const getTasksByTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

// Update task status
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status } = req.body;
  const { taskId } = req.params;
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

    // Only the teacher who created the task can update it
    if (decoded.id !== task.teacherId.toString()) {
      res.status(403).json({ message: "Not authorized to update this task" });
      return;
    }

    // Update only the fields that are provided
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};


// Delete task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};

export const getTasksByStudent = async (
  req: Request,
  res: Response
): Promise<void> => {

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const studentId = decoded.id;
  

    console.log(studentId);

    if (!studentId) {
      res.status(400).json({ message: "Student ID is required" });
      return;
    }

    if (!studentId) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const studentWithTasks = await Student.findById(studentId).populate({
      path: "tasks",
      
    });

    console.log("yyy", studentWithTasks);

    if (!studentWithTasks) {
      res.status(404).json({ message: "Tasks for the student not found" });
      return;
    }

    res.status(200).json(studentWithTasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
