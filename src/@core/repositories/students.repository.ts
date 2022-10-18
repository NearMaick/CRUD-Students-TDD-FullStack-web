import { IStudent, IStudentDataDTO } from "../DTOs/Student.dto";

export interface IStudentsRepository {
  create(data: IStudent): Promise<IStudent>;
  findByEmail(email: string): Promise<IStudentDataDTO | undefined>;
  list(): Promise<IStudentDataDTO[]>;
}
