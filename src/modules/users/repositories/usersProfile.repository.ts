import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UsersProfileRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(data: Prisma.UsersProfileCreateInput) {
    return this._prismaService.usersProfile.create({
      data,
    });
  }

  getByUser(userId: string) {
    return this._prismaService.usersProfile.findFirst({
      where: {
        userId,
      },
    });
  }

  getById(id: string) {
    return this._prismaService.usersProfile.findFirst({
      where: {
        id,
      },
    });
  }
}
