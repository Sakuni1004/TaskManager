import Task from "../models/Task";
import mongoose from "mongoose";

//create task
export const createTaskRepo = (data: any) => new Task(data).save();


//find task by teache Id
export const findTaskByTeacherRepo = (teacherId: mongoose.Types.ObjectId) =>
  Task.find({ teacherId }).populate("studentId").exec();


//find task by student Id
export const findTaskByStudentRepo = async (studentId: mongoose.Types.ObjectId) => {
  return await Task.find({ studentId })
    .populate("teacherId")
    .lean() 
    .exec();
};

//update task by teacher
export const updateTask = async (taskId: String, taskData: any) => {
  return await Task.findByIdAndUpdate(taskId,  taskData , { new: true });
};

//update task status by student
export const updateTaskStatusRepo = async (taskId: String, status: string) => {
  return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
};

//delete
export const deleteTaskRepo = (id: any) => Task.findByIdAndDelete(id);


