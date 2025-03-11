

import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  username: string;
  email: string;
  password: string;
  role: "student" | ""; 
  tasks: mongoose.Types.ObjectId[]; 
  studentRegistrationNumber:String;

  
}

const StudentSchema = new Schema<IStudent>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", ""], 
    required: true,
    default: "", 
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  studentRegistrationNumber: {
    type: String,
    required: true,
    unique: true,
  },



});

export default mongoose.model<IStudent>("Student", StudentSchema);
