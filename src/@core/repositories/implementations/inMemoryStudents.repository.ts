import { IStudent, IStudentDataDTO } from "../../DTOs/Student.dto";
import { Student } from "../../entities/Student.entity";
import { IStudentsRepository } from "../Students.repository";

export class InMemoryStudentsRepository implements IStudentsRepository {
  public students: IStudentDataDTO[] = [];
  async create({ name, email }: IStudent): Promise<IStudent> {
    const student = new Student({
      email,
      name,
    });

    this.students.push({
      props: {
        id: student.id,
        email: student.email,
        name: student.name,
        createdAt: student.createdAt,
      },
    });

    return student;
  }

  async findByEmail(email: string): Promise<IStudentDataDTO | undefined> {
    return this.students.find((student) => student.props.email === email);
  }

  async list(): Promise<IStudentDataDTO[]> {
    return this.students;
  }
}
