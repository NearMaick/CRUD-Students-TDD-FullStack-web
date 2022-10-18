import { randomUUID } from "node:crypto";
import { IStudent } from "../DTOs/Student.dto";

export class Student {
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
