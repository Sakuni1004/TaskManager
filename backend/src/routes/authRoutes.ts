import express from "express";
import {signUp} from '../controllers/authController';
import login from "../controllers/loginController";

const router = express.Router();



router.post("/register", signUp);
router.post("/login", login);


export default router;
