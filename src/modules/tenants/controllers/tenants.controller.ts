import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateTenantDto } from '../dtos/createTenant.dto';
import { TenantsService } from '../services/tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly _tenantService: TenantsService) {}
  @Post()
  async createTenant(@Body() data: CreateTenantDto) {
    const id = await this._tenantService.createTenant(data);
    return {
      message: 'Tenant created successfully',
      status: HttpStatus.CREATED,
      id,
    };
  }
}
