interface AccountConstructor {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    email,
    password,
    createdAt,
    updatedAt,
  }: AccountConstructor) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
