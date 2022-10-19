import { Student } from "../../entities/Student.entity";
import { IStudentsRepository } from "../students.repository";

type ICreateStudentRepositoryDTO = Omit<"Student", "id, createdAt">;

export class InMemoryStudentsRepository implements IStudentsRepository {
  public students: Student[] = [];
  async create({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): Promise<Student> {
    const student = new Student();
    student.name = name;
    student.email = email;

    this.students.push(student);

    return student;
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    return this.students.find((student) => student.email === email);
  }

  async list(): Promise<Student[]> {
    return this.students;
  }
}
