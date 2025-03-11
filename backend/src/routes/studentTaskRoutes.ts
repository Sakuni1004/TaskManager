import express, { Request, Response } from "express";
import {getAllStudentsController} from '../controllers/studentController'
import { authenticateUser } from "../middleware/authMiddleware"; 


const router = express.Router();


router.get("/students",authenticateUser, getAllStudentsController);

export default router;