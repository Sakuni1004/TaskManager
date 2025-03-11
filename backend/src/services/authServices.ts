import { createStudentRepo, findOneStudentRepo } from "../db/studentRepo";

import { createTeacherRepo, findOneTeacherRepo } from "../db/teacherRepo";

import bcrypt from "bcrypt";

//signup
export const signupService = async (data: any) => {
  data.password = await bcrypt.hash(data.password, 10);

  if (data.role === "student") {
    return createStudentRepo(data);
  } else if (data.role === "teacher") {
    return createTeacherRepo(data);
  } else {
    throw new Error("Invalid role.");
  }
};

//login
export const loginService = async (email: string, password: string) => {
  let user;

  const student = await findOneStudentRepo({ email });
  const teacher = await findOneTeacherRepo({ email });

  if (student) {
    user = student;
  } else if (teacher) {
    user = teacher;
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials.");
  }

  return user;
};
