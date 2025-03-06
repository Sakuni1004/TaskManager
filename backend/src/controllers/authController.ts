import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import studentModel from "../models/studentModel";
import teacherModel from "../models/teacherModel";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role, studentId } = req.body;

   
    if (role !== "student" && role !== "teacher") {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

   
    let existingUser;
    if (role === "student") {
      existingUser = await studentModel.findOne({ email });
    } else {
      existingUser = await teacherModel.findOne({ email });
    }

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }


    const hashedPassword = await bcrypt.hash(password, 10);

   
    let newUser;

    if (role === "student") {
      newUser = new studentModel({ username, email, password: hashedPassword, role, studentId });
    } else if (role === "teacher") {
      newUser = new teacherModel({ username, email, password: hashedPassword, role });
    } else {
    
      res.status(400).json({ message: "Invalid role" });
      return;
    }

   
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

    return; 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};
