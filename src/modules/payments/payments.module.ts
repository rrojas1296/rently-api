import { Module } from '@nestjs/common';
import { PropertiesModule } from '../properties/properties.module';
import { TenantsModule } from '../tenants/tenants.module';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsService } from './services/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [],
  imports: [PropertiesModule, TenantsModule],
})
export class PaymentsModule {}
