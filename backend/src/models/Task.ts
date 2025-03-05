import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  assignedDate: Date;
  dueDate: Date;
  status: string;
  teacherId: mongoose.Schema.Types.ObjectId; 
  studentId?: mongoose.Schema.Types.ObjectId; 
}

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    
  },
  teacherId: {
    type: String,
    required: true,
   
  },
  studentId: {
    type: String,
  },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;


