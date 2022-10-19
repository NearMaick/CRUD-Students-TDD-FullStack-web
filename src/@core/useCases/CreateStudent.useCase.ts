import { Student } from "../entities/Student.entity";
import { IStudentsRepository } from "../repositories/students.repository";

export class CreateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({ name, email }: Student) {
    const studentAlreadyExists = await this.studentsRepository.findByEmail(
      email
    );

    if (studentAlreadyExists) {
      throw new Error("This email enrolled already");
    }

    const student = await this.studentsRepository.create({ name, email });

    return student;
  }
}
