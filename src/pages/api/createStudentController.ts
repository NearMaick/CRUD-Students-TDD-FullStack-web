import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaRepository } from "../../@core/repositories/implementations/prisma.repository";
import { CreateStudentUseCase } from "../../@core/useCases/CreateStudent.useCase";

export default async function listStudentController(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { name, email } = request.body;
  const prismaRepository = new PrismaRepository();
  const createStudent = new CreateStudentUseCase(prismaRepository);

  const student = await createStudent.execute({
    name,
    email,
  });

  response.status(200).json(student);
}
