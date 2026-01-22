import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/usersRepository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, Users } from 'generated/prisma/client';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.users.findMany();
  }

  async findByEmail(email: string) {
    return this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
  }

  async create(user: Prisma.UsersCreateInput): Promise<Users> {
    return this.prismaService.users.create({
      data: user,
    });
  }

  async findById(id: string): Promise<Users | null> {
    return this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
  }
}
