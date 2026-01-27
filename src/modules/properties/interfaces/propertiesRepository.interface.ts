import { Prisma, Properties } from 'generated/prisma/client';

export interface IPropertiesRepository {
  findAll(userId: string): Promise<Properties[]>;
  create(property: Prisma.PropertiesCreateInput): Promise<Properties>;
}
