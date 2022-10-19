import { Student } from "../entities/Student.entity";

export interface IStudentsRepository {
  create({ name, email }: Student): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
  list(): Promise<Student[]>;
}
