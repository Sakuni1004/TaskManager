import mongoose, { Schema, Document } from "mongoose";

export interface Student extends Document {
  username: string;
  email: string;
  password: string;
  role: "student" | ""; 
  tasks: mongoose.Types.ObjectId[]; 
  studentId: String;
  
}

const StudentSchema = new Schema<Student>({
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
  studentId:{
    type:String,
    required: true,
  },


});

export default mongoose.model<Student>("Student", StudentSchema);
