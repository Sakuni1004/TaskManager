import Task from "../models/Task";
import mongoose from "mongoose";

//create task
export const createTaskRepo = (data: any) => new Task(data).save();


//find task by teache Id
export const findTaskByTeacherRepo = (teacherId: mongoose.Types.ObjectId) =>
  Task.find({ teacherId }).populate("studentId").exec();


//find task by student Id
export const findTaskByStudentRepo = async (
  studentId: mongoose.Types.ObjectId | string
) => {
  console.log("findTaskByStudentRepo called with studentId:", studentId);

  const objectId = new mongoose.Types.ObjectId(studentId);

  const tasks = await Task.find({ studentId: objectId })
    .populate("teacherId")
    .exec();

  console.log("Tasks found:", tasks);
  return tasks;
};


//update task by id
export const updateTask = async (taskId: string, taskData: any) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
      runValidators: true,
    });
    return updatedTask;
  } catch (error) {
    throw new Error("Error updating task: ");
  }
};

//delete
export const deleteTaskRepo = (id: any) => Task.findByIdAndDelete(id);
