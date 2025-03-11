import { Request, Response } from "express";
import { loginService } from "../services/authServices";
import jwt from "jsonwebtoken";

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User object:", user);

    const payload: any = {
      name: user.username,
      _id: user._id,
      role: user.role,
    };

    if (user.role === "student") {
      payload.studentRegistrationNumber = user.studentRegistrationNumber;
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    console.log("Generated Token:", token);
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,

      ...(user.role === "student" && { studentId: user._id }),
      ...(user.role === "teacher" && { teacherId: user._id }),
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};
