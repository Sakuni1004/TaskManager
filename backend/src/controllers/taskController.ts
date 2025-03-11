import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getTasksByStudentService,
  getTasksByTeacherService,
  updateTaskService,
  updateTaskStatusService,
} from "../services/taskServices";

//create task
export const createTaskController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      title,
      description,
      dueDate,
      status,
      teacherId,
      studentId,
      studentRegistrationNumber,
    } = req.body;

    if (
      !title ||
      !description ||
      !dueDate ||
      !status ||
      !teacherId ||
      !studentId ||
      !studentRegistrationNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = await createTaskService({
      title,
      description,
      dueDate,
      status,
      teacherId,
      studentId,
      studentRegistrationNumber,
    });
    console.log(newTask);

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in createTaskController:", error);
    return res.status(500).json({ message: "Error creating task" });
  }
};


//get Tasks by teacher Id
export const getTasksByTeacherId = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;

    const tasks = await getTasksByTeacherService(teacherId);
    console.log("tasksTeacher", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json("Error fetching tasks");
  }
};




//get task by student Id
export const getTasksByStudentId = async (req: Request, res: Response) => {
  console.log(" Controller reached!");
  try {
    const { studentId } = req.params;
    console.log("Received studentId:", studentId);

    const tasks = await getTasksByStudentService(studentId);
    console.log("Fetched tasks:", tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//update tasks by taskId
export const updateTaskController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const taskData = req.body;

  try {
    const updatedTask = await updateTaskService(taskId, taskData);

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task: " });
  }
};

//updateStatus
export const updateTaskStatusController = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { status } = req.body;
    const { taskId } = req.params;
    console.log("tttt",req.body) ;
    console.log("id",taskId) ;

    if (!status) {
       
       res.status(400).json({ message: "Status is required." });
       return;
    } 

    const updatedTask = await updateTaskStatusService(taskId, status);
    console.log("update",updatedTask) ;

    if (!updatedTask) {
       res.status(404).json({ message: "Task not found or could not be updated." });

    }

     res.status(200).json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error: any) {
     res.status(500).json({
      message: "Server error updating task status",
      error: error.message,
    });
  }
};



//delete
export const deleteTaskController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; 

    if (!id) {
      res.status(400).json({ error: "Task ID is required" });
      return;
    }

    const message = await deleteTaskService(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to delete task" });
  }
};