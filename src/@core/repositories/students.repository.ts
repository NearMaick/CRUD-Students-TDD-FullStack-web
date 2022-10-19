import { Student } from "../entities/Student.entity";

type ICreateStudentRepositoryDTO = Omit<Student, "id" | "createdAt">;

export interface IStudentsRepository {
  create({ name, email }: ICreateStudentRepositoryDTO): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
  list(): Promise<Student[]>;
}
