import { PrismaClient } from "@prisma/client";
import {
  ICreateStudentRepositoryDTO,
  IStudentsListDTO,
} from "../../DTOs/student.dto";
import { Student } from "../../entities/Student.entity";
import { IStudentsRepository } from "../students.repository";

export class PrismaRepository implements IStudentsRepository {
  create({ name, email }: ICreateStudentRepositoryDTO): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<Student> {
    throw new Error("Method not implemented.");
  }
  async list(): Promise<IStudentsListDTO[]> {
    const prisma = new PrismaClient();

    return prisma.student.findMany();
  }
}
