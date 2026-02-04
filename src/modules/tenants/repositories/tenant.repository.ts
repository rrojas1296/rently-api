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
}
