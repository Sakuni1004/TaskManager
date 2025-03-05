import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";  

 const login = async (req: Request, res: Response): Promise<void> => {
  try {

    console.log("JWT_SECRET login", process.env.JWT_SECRET);
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
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
      id: user.id,
      iat: Math.floor(Date.now() / 1000), 
      role: user.role,  
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    console.log("Role:", user.role);
    console.log("t", token);
 

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
     
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};


export default login;