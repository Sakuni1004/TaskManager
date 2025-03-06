import mongoose, { Schema, Document } from "mongoose";

export interface Teacher extends Document {
  username: string;
  email: string;
  password: string;
  role: "teacher";
}

const TeacherSchema = new Schema<Teacher>({
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
    enum: ["teacher"],
    required: true,
    default: "teacher",
  },
});

export default mongoose.model<Teacher>("Teacher", TeacherSchema);
