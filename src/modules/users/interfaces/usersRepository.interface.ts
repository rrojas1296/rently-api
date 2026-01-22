import { Users } from 'generated/prisma/browser';

export interface IUsersRepository {
  findAll(): Promise<Users[]>;
  findByEmail(email: string): Promise<Users | null>;
  create(user: Users): Promise<Users>;
}
