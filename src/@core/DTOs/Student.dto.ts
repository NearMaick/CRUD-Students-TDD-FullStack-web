export interface IStudent {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export type IStudentDataRequestDTO = Omit<IStudent, "id" | "createdAt">;

export interface IStudentDataDTO {
  props: IStudent;
}
