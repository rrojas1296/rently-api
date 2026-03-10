import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [AuthModule, PropertiesModule, TenantsModule, PaymentsModule],
  controllers: [AppController],
})
export class AppModule {}
