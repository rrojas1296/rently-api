import { Injectable } from '@nestjs/common';
import { PropertiesRepository } from 'src/modules/properties/repositories/properties.repository';
import { TenantRepository } from 'src/modules/tenants/repositories/tenant.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly _tenantsRepository: TenantRepository,
    private readonly _propertyRepository: PropertiesRepository,
  ) {}
  async getFilters(ownerId: string) {
    const tenants =
      await this._tenantsRepository.getTenantsWithPayments(ownerId);
    const properties =
      await this._propertyRepository.getPropertisWithPayments(ownerId);
    return { tenants, properties };
  }
}
