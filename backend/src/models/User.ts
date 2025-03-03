import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: "student" | "teacher";
  tasks: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model<User>("User", UserSchema);
