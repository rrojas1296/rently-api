import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto } from '../dtos/createTenant.dto';
import { TenantRepository } from '../repositories/tenant.repository';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { PropertyStatus, UserRole } from 'generated/prisma/enums';
import { PropertiesRepository } from 'src/modules/properties/repositories/properties.repository';

@Injectable()
export class TenantsService {
  constructor(
    private readonly _tenantRepository: TenantRepository,
    private readonly _usersRepository: UsersRepository,
    private readonly _propertyRepository: PropertiesRepository,
  ) {}

  async createTenant(data: CreateTenantDto) {
    try {
      const {
        email,
        phone,
        emergencyPhone,
        lastName,
        firstName,
        property,
        entryDate,
        paymentDay,
        nationality,
        documentType,
        documentNumber,
        exitDate,
      } = data;
      const newUser = await this._usersRepository.create({
        firstName,
        lastName,
        email,
        role: UserRole.TENANT,
      });
      await this._tenantRepository.create({
        documentNumber,
        exitDate,
        entryDate,
        nationality,
        paymentDay,
        documentType,
        emergencyPhone,
        phone,
        user: {
          connect: {
            id: newUser.id,
          },
        },
        property: {
          connect: {
            id: property,
          },
        },
      });
      await this._propertyRepository.update(
        {
          status: PropertyStatus.OCCUPIED,
        },
        property,
      );
      return newUser.id;
    } catch {
      throw new HttpException('server_error', HttpStatus.BAD_REQUEST);
    }
  }

  getTenants(ownerId: string) {
    return this._tenantRepository.getAll(ownerId);
  }
}
