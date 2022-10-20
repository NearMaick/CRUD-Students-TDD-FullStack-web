import {
  ICreateStudentRepositoryDTO,
  IStudentsListDTO,
} from "../DTOs/student.dto";

export interface IStudentsRepository {
  create({
    name,
    email,
  }: ICreateStudentRepositoryDTO): Promise<IStudentsListDTO>;
  findByEmail(email: string): Promise<IStudentsListDTO | undefined>;
  list(): Promise<IStudentsListDTO[]>;
}
