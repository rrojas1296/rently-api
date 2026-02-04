import { Module } from '@nestjs/common';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';

@Module({
  providers: [TenantsService],
  controllers: [TenantsController],
})
export class TenantsModule {}
