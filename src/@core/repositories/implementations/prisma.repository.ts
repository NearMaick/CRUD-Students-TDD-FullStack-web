import { PrismaClient } from "@prisma/client";
import { IStudent, IStudentDataDTO } from "../../DTOs/Student.dto";
import { IStudentsRepository } from "../students.repository";

export class PrismaRepository implements IStudentsRepository {
  create(data: IStudent): Promise<IStudent> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<IStudentDataDTO> {
    throw new Error("Method not implemented.");
  }

  async list(): Promise<IStudentDataDTO[]> {
    const prisma = new PrismaClient();

    return prisma.student.findMany();
  }
}
