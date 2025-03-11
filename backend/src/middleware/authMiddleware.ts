import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log("Request Headers:", req.headers);

  const authHeader = req.header("Authorization");

  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    (req as any).token = token;

    next();
  } catch (error) {
    console.error(" Token Verification Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
