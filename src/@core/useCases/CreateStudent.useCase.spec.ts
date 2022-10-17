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

interface StudentsRepository {
  create(data: IStudent): Promise<void>;
}

interface IStudentDataDTO {
  data: IStudent;
}

//  ----------------

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
}

class CreateStudent {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({ name, email }: IStudentDataRequestDTO) {
    const student = new Student({
      email,
      name,
    });

    await this.studentsRepository.create(student);
  }
}

describe("CreateStudent use", () => {
  let inMemoryStudentsRepository: InMemoryStudentsRepository;
  let createStudent: CreateStudent;

  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    createStudent = new CreateStudent(inMemoryStudentsRepository);
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
});
