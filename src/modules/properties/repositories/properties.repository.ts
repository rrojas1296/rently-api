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

  async findAll(ownerId: string): Promise<Properties[]> {
    return this._knexService
      .db('Properties as p')
      .select([
        'p.id as id',
        'p.name as name',
        'p.address as address',
        'p.internalCode as internalCode',
        'p.floor as floor',
        'p.area as area',
        'p.status as status',
        'p.monthlyPayment as monthlyPayment',
        'p.garanty as garanty',
        'p.currency as currency',
        'p.monthlyFee as monthlyFee',
        'p.persons as persons',
        'p.rooms as rooms',
        'p.bathrooms as bathrooms',
        'p.floors as floors',
        'p.furnished as furnished',
        'p.pets as pets',
        'p.condition as condition',
        'p.createdAt as createdAt',
        'p.updatedAt as updatedAt',
        'u.firstName as tenantName',
      ])
      .leftJoin('TenantsProfile as tp', 'tp.propertyId', 'p.id')
      .leftJoin('Users as u', 'tp.userId', 'u.id')
      .where('p.ownerId', ownerId);
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
