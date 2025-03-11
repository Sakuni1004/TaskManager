import Teacher from "../models/teacherModel";

// Create a new teacher
export const createTeacherRepo = (data: any) => new Teacher(data).save();

// Find a teacher by filters
export const findOneTeacherRepo = async (filters: any) => 
  Teacher.findOne(filters);

// Get all teachers with filters
export const getAllTeachersRepo = (filters: any) => Teacher.find(filters);

// Update teacher by ID
export const updateTeacherRepo = (id: any, updatedData: any) => 
  Teacher.findByIdAndUpdate(id, updatedData, { new: true });

// Delete teacher by ID
export const deleteTeacherRepo = (id: any) => Teacher.findByIdAndDelete(id);
