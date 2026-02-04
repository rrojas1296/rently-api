import { Injectable } from '@nestjs/common';
import { IPropertiesRepository } from '../interfaces/propertiesRepository.interface';
import { Prisma, Properties } from 'generated/prisma/client';
import { PropertiesCreateInput } from 'generated/prisma/models';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KnexService } from 'src/database/knex/knex.service';

@Injectable()
export class PropertiesRepository implements IPropertiesRepository {
  constructor(
    private readonly _knexService: KnexService,
    private readonly _prismaService: PrismaService,
  ) {}
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAvailable(ownerId: string) {
    return this._knexService
      .db('Properties as p')
      .select(['p.id as id', 'p.name as name'])
      .where('p.ownerId', ownerId)
      .andWhere('p.status', 'AVAILABLE');
  }

  async update(data: Prisma.PropertiesUpdateInput, id: string) {
    return this._prismaService.properties.update({
      where: {
        id,
      },
      data,
    });
  }
}
