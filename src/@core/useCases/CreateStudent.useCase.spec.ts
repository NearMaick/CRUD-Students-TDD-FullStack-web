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
  private props: IStudent;

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

  constructor(props: IStudent) {
    this.props = props;

    this.props.id = randomUUID();
    this.props.createdAt = new Date();
  }
}

// DTOs (Data transfer objects)

type IStudentDataRequestDTO = Omit<Student, "id" | "createdAt">;

interface IStudentDataDTO {
  props: IStudent;
}

//  ----------------
interface StudentsRepository {
  create(data: IStudent): Promise<IStudent>;
  findByEmail(email: string): Promise<IStudentDataDTO | undefined>;
  list(): Promise<IStudentDataDTO[]>;
}

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: IStudentDataDTO[] = [];
  async create({ name, email }: IStudent): Promise<IStudent> {
    const student = new Student({
      email,
      name,
    });

    this.students.push({
      props: {
        id: student.id,
        email: student.email,
        name: student.name,
        createdAt: student.createdAt,
      },
    });

    return student;
  }

  async findByEmail(email: string): Promise<IStudentDataDTO | undefined> {
    return this.students.find((student) => student.props.email === email);
  }

  async list(): Promise<IStudentDataDTO[]> {
    return this.students;
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

    const student = await this.studentsRepository.create({
      email,
      name,
    });

    return student;
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
    expect(inMemoryStudentsRepository.students[0].props.name).toEqual(
      "John Doe"
    );
    expect(inMemoryStudentsRepository.students[0].props.email).toEqual(
      "email@test.com"
    );
    expect(inMemoryStudentsRepository.students[0].props).toHaveProperty("id");
    expect(inMemoryStudentsRepository.students[0].props).toHaveProperty(
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

class ListStudentsUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(): Promise<IStudentDataDTO[]> {
    const students = this.studentsRepository.list();
    return students;
  }
}

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
