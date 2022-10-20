import { PrismaClient } from "@prisma/client";
import {
  ICreateStudentRepositoryDTO,
  IStudentsListDTO,
} from "../../DTOs/student.dto";
import { IStudentsRepository } from "../students.repository";

const prisma = new PrismaClient();
export class PrismaRepository implements IStudentsRepository {
  async create({
    name,
    email,
  }: ICreateStudentRepositoryDTO): Promise<IStudentsListDTO> {
    const student = await prisma.student.create({
      data: { name, email },
    });
    return student;
  }

  async findByEmail(email: string): Promise<IStudentsListDTO | undefined> {
    return prisma.student.findFirst({
      where: {
        email,
      },
    });
  }

  async list(): Promise<IStudentsListDTO[]> {
    return prisma.student.findMany();
  }
}
