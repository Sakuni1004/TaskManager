import mongoose, { Schema, Document } from "mongoose";



interface ITask extends Document {
  title: string;
  description: string;
  assignedDate: Date;
  dueDate: Date;
  status: string;
  teacherId: mongoose.Schema.Types.ObjectId;
  studentId: String;
  student: mongoose.Schema.Types.ObjectId;
  
  
  
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentId: {
    type: String,
  },
 
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", 
    required: true,
  },


});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
