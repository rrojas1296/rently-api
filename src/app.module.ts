import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [AuthModule, PropertiesModule],
  controllers: [AppController],
})
export class AppModule {}
