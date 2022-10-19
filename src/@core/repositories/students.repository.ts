import {
  ICreateStudentRepositoryDTO,
  IStudentsListDTO,
} from "../DTOs/student.dto";
import { Student } from "../entities/Student.entity";

export interface IStudentsRepository {
  create({ name, email }: ICreateStudentRepositoryDTO): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
  list(): Promise<IStudentsListDTO[]>;
}
