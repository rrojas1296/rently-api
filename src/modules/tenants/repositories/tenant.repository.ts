import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { KnexService } from 'src/database/knex/knex.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class TenantRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _knexService: KnexService,
  ) {}
  async create(data: Prisma.TenantsProfileCreateInput) {
    const tenant = await this._prismaService.tenantsProfile.create({
      data,
    });
    return tenant.id;
  }

  async getAll(ownerId: string) {
    return this._knexService
      .db('Users as u')
      .select([
        'u.id as id',
        this._knexService.db.raw(
          'CONCAT(u."firstName", \' \', u."lastName") as name',
        ),
        'u.email as email',
        'u.role as role',
        'u.createdAt as createdAt',
        'u.updatedAt as updatedAt',
        'tp.paymentStatus as paymentStatus',
        'tp.entryDate as entryDate',
        'tp.exitDate as exitDate',
        'tp.nationality as nationality',
        'tp.documentType as documentType',
        'tp.documentNumber as documentNumber',
        'tp.emergencyPhone as emergencyPhone',
        'tp.phone as phone',
        'tp.paymentDay as paymentDay',
        'tp.avatarUrl as avatarUrl',
        'p.name as propertyName',
        'p.currency as currency',
        'p.monthlyPayment as monthlyPayment',
      ])
      .where('p.ownerId', ownerId)
      .innerJoin('TenantsProfile as tp', 'tp.userId', 'u.id')
      .rightJoin('Properties as p', 'p.id', 'tp.propertyId');
  }
}
