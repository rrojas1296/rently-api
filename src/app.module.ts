import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { TenantsModule } from './modules/tenants/tenants.module';

@Module({
  imports: [AuthModule, PropertiesModule, TenantsModule],
  controllers: [AppController],
})
export class AppModule {}
