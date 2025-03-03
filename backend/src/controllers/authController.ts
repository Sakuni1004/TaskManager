import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

    // Ensure the function does not return a Response object
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};



