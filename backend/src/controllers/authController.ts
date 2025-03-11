import { Request, Response } from "express";
import { signupService, loginService } from "../services/authServices";

//signup user
export const signUpController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, email, password, role, studentRegistrationNumber } =
    req.body;
  try {
    const userData = {
      username,
      email,
      password,
      role,
      studentRegistrationNumber,
    };
    const createdUser = await signupService(userData);
    return res.status(201).json({
      message: `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } registered successfully!`,
      user: createdUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

//login user
// export const loginController = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   try {
//     const user = await loginService(email, password);
//     return res.status(200).json({
//       message: "Login successful",
//       user,
//     });
//   } catch (error: any) {
//     console.error(error);
//     res.status(401).json({ message: error.message || "Invalid credentials." });
//   }
// };
