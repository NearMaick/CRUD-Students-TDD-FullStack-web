import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaRepository } from "../../@core/repositories/implementations/prisma.repository";
import { ListStudentsUseCase } from "../../@core/useCases/ListStudents.useCase";

export default async function listStudentController(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const prismaRepository = new PrismaRepository();
  const listStudents = new ListStudentsUseCase(prismaRepository);

  const students = await listStudents.execute();

  response.status(200).json(students);
}
