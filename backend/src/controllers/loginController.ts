import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import studentModel from "../models/studentModel"; 
import teacherModel from "../models/teacherModel"; 

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("JWT_SECRET login", process.env.JWT_SECRET);

    const { email, password } = req.body;

    let user;
    let role;
    let studentId = null;
    let userId;
    let name;
    

    
    user = await studentModel.findOne({ email });
    role = "student";

    console.log("u",user);

    if (!user) {
      
      user = await teacherModel.findOne({ email });
      role = "teacher";
    } else {
      studentId = user.studentId; 
      userId = user._id;
    }

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

  
    const payload = {
      id: user._id,
      role: role,
      studentId: studentId, 
      name:user.username
      
    };

   
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    console.log("Role:", role);
    console.log("Token:", token);
    console.log("Student ID:", studentId); 
    console.log("student",user._id);
    console.log("name",name);
   

    
    res.status(200).json({
      message: "Login successful",
      token,
      role,
      studentId, 
      name
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

export default loginUser;



