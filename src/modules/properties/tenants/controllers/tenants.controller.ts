import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantDto } from '../dtos/createTenant.dto';

@Controller('tenants')
export class TenantsController {
  @Post()
  createTenant(@Body() data: CreateTenantDto) {}
}
