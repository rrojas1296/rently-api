import { Module } from '@nestjs/common';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';
import { TenantRepository } from './repositories/tenant.repository';
import { UsersModule } from '../users/users.module';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  providers: [TenantsService, TenantRepository],
  controllers: [TenantsController],
  imports: [UsersModule, PropertiesModule],
})
export class TenantsModule {}
