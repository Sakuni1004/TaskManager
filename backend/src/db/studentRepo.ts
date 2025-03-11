import Student from "../models/studentModel";

export const createStudentRepo = (data: any) => new Student(data).save();

export const findOneStudentRepo = async (filters: any) =>
  Student.findOne(filters);

export const getAllStudentsRepo = (filters: any) => Student.find(filters);

export const updateStudentRepo = (id: any, updatedData: any) =>
  Student.findByIdAndUpdate(id, updatedData, { new: true });

export const deleteStudentRepo = (id: any) => Student.findByIdAndDelete(id);
