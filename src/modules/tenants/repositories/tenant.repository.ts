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
    const RANGE_DAYS = 5;
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
        this._knexService.db.raw(`
            CASE
              WHEN tp."paymentStatus" = 'PAID' THEN 'PAID'
              WHEN tp."paymentDay" = EXTRACT(DAY FROM CURRENT_DATE) THEN 'DUE_TODAY'
              WHEN np.next_payment_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '${RANGE_DAYS} day' THEN 'DUE_SOON'
              WHEN np.next_payment_date < CURRENT_DATE THEN 'OVERDUE'
              ELSE 'UNPAID'
            END AS "computedPaymentStatus"
          `),
        'p.name as propertyName',
        'p.currency as currency',
        'p.monthlyPayment as monthlyPayment',
      ])
      .where('p.ownerId', ownerId)
      .innerJoin('TenantsProfile as tp', 'tp.userId', 'u.id')
      .rightJoin('Properties as p', 'p.id', 'tp.propertyId')
      .leftJoin(
        this._knexService.db.raw(`
            LATERAL (
              SELECT
                CASE
                  WHEN tp."paymentDay" > EXTRACT(DAY FROM CURRENT_DATE)
                  THEN make_date(
                    EXTRACT(YEAR FROM CURRENT_DATE)::int,
                    EXTRACT(MONTH FROM CURRENT_DATE)::int,
                    tp."paymentDay"
                  )
                  ELSE make_date(
                    EXTRACT(YEAR FROM CURRENT_DATE)::int,
                    EXTRACT(MONTH FROM CURRENT_DATE)::int + 1,
                    tp."paymentDay"
                  )
                END AS next_payment_date
            ) np
          `),
        this._knexService.db.raw('TRUE'),
      );
  }
}
