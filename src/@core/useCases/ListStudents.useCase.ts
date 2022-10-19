import { IStudentsListDTO } from "../DTOs/student.dto";
import { IStudentsRepository } from "../repositories/students.repository";

export class ListStudentsUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute(): Promise<IStudentsListDTO[]> {
    return this.studentsRepository.list();
  }
}
