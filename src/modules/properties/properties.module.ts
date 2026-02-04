import { Module } from '@nestjs/common';
import { PropertiesController } from './controllers/properties.controller';
import { PropertiesService } from './services/properties.service';
import { PropertiesRepository } from './repositories/properties.repository';
import { KnexModule } from 'src/database/knex/knex.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [PropertiesService, PropertiesRepository],
  controllers: [PropertiesController],
  imports: [KnexModule, UsersModule],
})
export class PropertiesModule {}
