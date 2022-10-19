import { IStudentDataDTO } from "../DTOs/Student.dto";
import { IStudentsRepository } from "../repositories/students.repository";

export class ListStudentsUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute(): Promise<IStudentDataDTO[]> {
    const students = this.studentsRepository.list();
    return students;
  }
}
