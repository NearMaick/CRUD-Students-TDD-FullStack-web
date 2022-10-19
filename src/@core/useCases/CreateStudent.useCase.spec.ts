import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStudentsRepository } from "../repositories/implementations/inMemoryStudents.repository";
import { CreateStudentUseCase } from "./CreateStudent.useCase";

describe("CreateStudent useCase", () => {
  let inMemoryStudentsRepository: InMemoryStudentsRepository;
  let createStudent: CreateStudentUseCase;

  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudentUseCase(inMemoryStudentsRepository);
  });

  it("should be able to create a new student", async () => {
    await expect(
      createStudent.execute({
        email: "email@test.com",
        name: "John Doe",
      })
    ).resolves.not.toThrow();
    expect(inMemoryStudentsRepository.students[0].name).toEqual("John Doe");
    expect(inMemoryStudentsRepository.students[0].email).toEqual(
      "email@test.com"
    );
    expect(inMemoryStudentsRepository.students[0]).toHaveProperty("id");
    expect(inMemoryStudentsRepository.students[0]).toHaveProperty("createdAt");
  });

  it("should not be able to create a new student with same email", () => {
    expect(async () => {
      await createStudent.execute({
        email: "email@test.com",
        name: "John Doe",
      });

      await createStudent.execute({
        email: "email@test.com",
        name: "John Doe",
      });
    }).rejects.toEqual(new Error("This email enrolled already"));
  });
});
