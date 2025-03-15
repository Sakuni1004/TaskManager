import mongoose, { Schema, Document } from "mongoose";



interface ITask extends Document {
  title: string;
  description: string;
  assignedDate: Date;
  dueDate: Date;
  status: string;
  teacherId: mongoose.Schema.Types.ObjectId;
  studentRegistrationNumber: String;
  studentId: mongoose.Schema.Types.ObjectId;
  
  
  
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
    ref: "Teacher",
    required: true
    
  },
  studentRegistrationNumber: {
    type: String,
  },
 
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student", 
    
  },


});

export default mongoose.model<ITask>("Task", taskSchema);

