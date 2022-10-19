import { Student } from "../entities/Student.entity";

export type ICreateStudentRepositoryDTO = Omit<Student, "id" | "createdAt">;
export type IStudentsListDTO = Omit<Student, "_name" | "_email">;
