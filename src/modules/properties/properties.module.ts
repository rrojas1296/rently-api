import { Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties.controller';
import { PropertiesService } from './services/properties.service';
import { PropertiesRepository } from './repositories/properties.repository';

@Module({
  providers: [PropertiesService, PropertiesRepository],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
