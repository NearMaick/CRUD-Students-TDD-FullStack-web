import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/implementations/InMemoryStudents.repository";
import { CreateStudentUseCase } from "./CreateStudent.useCase";
import { ListStudentsUseCase } from "./ListStudents.useCase";

describe("list students UseCase", () => {
  let inMemoryStudentsRepository: InMemoryStudentsRepository;
  let createStudent: CreateStudentUseCase;
  let listStudents: ListStudentsUseCase;

  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudentUseCase(inMemoryStudentsRepository);
    listStudents = new ListStudentsUseCase(inMemoryStudentsRepository);
  });

  it("should be able to list students", async () => {
    const student = await createStudent.execute({
      email: "email@test.com",
      name: "John Doe",
    });

    const students = await listStudents.execute();
    expect(students).toEqual([student]);
  });
});
