import {getAllStudentsRepo} from '../db/studentRepo';

export const getAllStudents = async (filters: any) => {
    try {
      if (filters && filters.studentId && typeof filters.studentId !== 'string') {
        throw new Error("Invalid student ID format");
      }
  
      return await getAllStudentsRepo(filters);
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  };