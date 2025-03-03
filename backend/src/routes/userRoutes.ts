import express from 'express';
import User from '../models/User'; 

const router = express.Router();

router.post('/users', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {

    
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({ message: 'Error creating user', error: errorMessage });
  }
});

export default router;
