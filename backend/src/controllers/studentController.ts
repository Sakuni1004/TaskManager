import { Request, Response } from 'express';
import {getAllStudents} from '../services/studentServices'


export const getAllStudentsController = async (req: Request, res: Response) => {
    try {
      const filters = req.query; 
      const students = await getAllStudents(filters);
      res.status(200).json({ success: true, data: students });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(400).json({ success: false, message: errorMessage });
    }
  };