import express from "express";
import dotenv from "dotenv";
import connectDB from './config/database';  
import userRoutes from './routes/userRoutes';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());


connectDB();


app.get("/", (req, res) => { 
  res.send("Server is running...");
});


app.use('/api', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack); 
  res.status(500).json({ message: 'Something went wrong', error: err.message || err });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
