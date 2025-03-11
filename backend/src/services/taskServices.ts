import {
  createTaskRepo,
  deleteTaskRepo,
  findTaskByStudentRepo,
  findTaskByTeacherRepo,
  updateTask,
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
    throw new Error("Invalid student ID format");
  }
  const objectId = new mongoose.Types.ObjectId(TeacherId);

  return await findTaskByTeacherRepo(objectId);
};


//get task by studentId
export const getTasksByStudentService = async (studentId: string) => {
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new Error("Invalid student ID format");
  }

  const objectId = new mongoose.Types.ObjectId(studentId);
  console.log(" Converted studentId:", studentId);

  const tasks = await findTaskByStudentRepo(objectId);
  console.log(" Tasks fetched in Service:", tasks);

  return tasks;
};


// update task by studentId
export const updateTaskService = async (taskId: string, taskData: any) => {
  try {
    const updatedTask = await updateTask(taskId, taskData);
    return updatedTask;
  } catch (error) {
    throw new Error("Service error while updating task: ");
  }
};


//delete
export const deleteTaskService = async (taskId: string): Promise<string> => {
  const deletedTask = await deleteTaskRepo(taskId);

  if (!deletedTask) {
    throw new Error(`Task with ID ${taskId} not found.`);
  }

  return "Task deleted successfully";
};
