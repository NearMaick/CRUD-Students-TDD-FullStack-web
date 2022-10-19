import { randomUUID } from "node:crypto";

export class Student {
  private _id?: string;
  private _name: string;
  private _email: string;
  private _createdAt?: Date;

  public get id() {
    return this._id!;
  }

  public get name() {
    return this._name;
  }

  public get email() {
    return this._email;
  }

  public get createdAt() {
    return this._createdAt!;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set email(value: string) {
    this._email = value;
  }

  private set id(value: string) {
    this._id = value;
  }

  private set createdAt(value: Date) {
    this._createdAt = value;
  }

  constructor() {
    this._id = randomUUID();
    this._createdAt = new Date();
  }
}
