import { Injectable } from '@nestjs/common';
import { IPropertiesRepository } from '../interfaces/propertiesRepository.interface';
import { Properties } from 'generated/prisma/client';
import { PropertiesCreateInput } from 'generated/prisma/models';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class PropertiesRepository implements IPropertiesRepository {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(data: PropertiesCreateInput): Promise<Properties> {
    return await this._prismaService.properties.create({
      data,
    });
  }

  async findAll(userId: string): Promise<Properties[]> {
    return await this._prismaService.properties.findMany({
      where: {
        ownerId: userId,
      },
    });
  }
}
