import { IStudentsCreateDTO, IStudentsListDTO } from "../DTOs/student.dto";
import { IStudentsRepository } from "../repositories/students.repository";

export class CreateStudentUseCase {
  constructor(private studentsRepository: IStudentsRepository) {}

  async execute({
    name,
    email,
  }: IStudentsCreateDTO): Promise<IStudentsListDTO> {
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
