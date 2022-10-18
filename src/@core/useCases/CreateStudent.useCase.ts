import { IStudentDataRequestDTO } from "../DTOs/Student.dto";
import { IStudentsRepository } from "../repositories/Students.repository";

export class CreateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({ name, email }: IStudentDataRequestDTO) {
    const studentAlreadyExists = await this.studentsRepository.findByEmail(
      email
    );

    if (studentAlreadyExists) {
      throw new Error("This email enrolled already");
    }

    const student = await this.studentsRepository.create({
      email,
      name,
    });

    return student;
  }
}
