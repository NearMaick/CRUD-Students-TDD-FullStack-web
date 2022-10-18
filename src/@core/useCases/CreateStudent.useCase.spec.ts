import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";

// Entity

interface IStudent {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

class Student {
  public get id() {
    return this.props.id!;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get createdAt() {
    return this.props.createdAt!;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public set email(value: string) {
    this.props.email = value;
  }

  private set id(value: string) {
    this.props.id = value;
  }

  private set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  constructor(private props: IStudent) {
    this.props.id = randomUUID();
    this.props.createdAt = new Date();
  }
}

// DTOs (Data transfer objects)

type IStudentDataRequestDTO = Omit<Student, "id" | "createdAt">;

interface IStudentDataDTO {
  data: IStudent;
}

//  ----------------
interface StudentsRepository {
  create(data: IStudent): Promise<void>;
  findByEmail(email: string): Promise<IStudentDataDTO | undefined>;
}

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: IStudentDataDTO[] = [];
  async create({ id, name, email, createdAt }: IStudent): Promise<void> {
    this.students.push({
      data: {
        id,
        email,
        name,
        createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<IStudentDataDTO | undefined> {
    return this.students.find((student) => student.data.email === email);
  }
}

class CreateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({ name, email }: IStudentDataRequestDTO) {
    const studentAlreadyExists = await this.studentsRepository.findByEmail(
      email
    );

    if (studentAlreadyExists) {
      throw new Error("This email enrolled already");
    }

    const student = new Student({
      email,
      name,
    });

    await this.studentsRepository.create(student);
  }
}

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
    expect(inMemoryStudentsRepository.students[0].data.name).toEqual(
      "John Doe"
    );
    expect(inMemoryStudentsRepository.students[0].data.email).toEqual(
      "email@test.com"
    );
    expect(inMemoryStudentsRepository.students[0].data).toHaveProperty("id");
    expect(inMemoryStudentsRepository.students[0].data).toHaveProperty(
      "createdAt"
    );
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
