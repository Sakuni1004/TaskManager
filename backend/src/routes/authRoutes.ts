import express from "express";
import {signUp} from '../controllers/authController';
import loginUser from "../controllers/loginController";

const router = express.Router();



router.post("/register", signUp);
router.post("/login", loginUser);


export default router;
