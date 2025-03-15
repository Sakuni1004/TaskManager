import {
  createTaskRepo,
  deleteTaskRepo,
  findTaskByStudentRepo,
  findTaskByTeacherRepo,
  updateTask,
  updateTaskStatusRepo,
} from "../db/taskRepo";
import mongoose from "mongoose";

import Task from "../models/Task";

//create task
export const createTaskService = async (taskData: any) => {
  const newTask = new Task(taskData);
  return newTask.save();
};

//get task by teacheId
export const getTasksByTeacherService = async (TeacherId: string) => {
  if (!mongoose.Types.ObjectId.isValid(TeacherId)) {
    throw new Error("Invalid teacher ID format");
  }
  const objectId = new mongoose.Types.ObjectId(TeacherId);

  return await findTaskByTeacherRepo(objectId);
};

//get task by studentId
export const getTasksByStudentService = async (studentId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Invalid student ID format");
    }
    const objectId = new mongoose.Types.ObjectId(studentId);
    const tasks = await findTaskByStudentRepo(objectId);
    return tasks;
  } catch (error) {
    console.error(
      "Error in getTasksByStudentService:",
      (error as Error).message
    );
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};

// update task by teacher
export const updateTaskService = async (taskId: string, taskData: any) => {
  try {
    const updatedTask = await updateTask(taskId, taskData);
    return updatedTask;
  } catch (error) {
    throw new Error("Service error while updating task: ");
  }
};

// update task status
export const updateTaskStatusService = async (
  taskId: String,
  status: string
) => {
  if (!taskId || !status) {
    console.log("tttt", taskId);
    console.log("mmm", status);

    throw new Error("Task ID and status are required.");
  }

  const updatedTask = await updateTaskStatusRepo(taskId, status);
  if (!updatedTask) {
    throw new Error("Task not found or could not be updated.");
  }

  return updatedTask;
};

//delete
export const deleteTaskService = async (taskId: string): Promise<string> => {
  const deletedTask = await deleteTaskRepo(taskId);

  if (!deletedTask) {
    throw new Error(`Task with ID ${taskId} not found.`);
  }

  return "Task deleted successfully";
};
