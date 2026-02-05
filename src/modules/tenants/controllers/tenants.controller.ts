import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTenantDto } from '../dtos/createTenant.dto';
import { TenantsService } from '../services/tenants.service';
import { type RequestWithUser } from 'src/modules/auth/types/requestWithUser.interface';
import { JwtGuard } from 'src/modules/guards/jwt.guard';

@UseGuards(JwtGuard)
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

  @Get()
  async getTenants(@Req() req: RequestWithUser) {
    const ownerId = req.user.id;
    const tenants = await this._tenantService.getTenants(ownerId);
    return {
      message: 'Tenants found successfully',
      status: HttpStatus.OK,
      tenants,
      hasTenants: tenants.length > 0,
    };
  }
}
