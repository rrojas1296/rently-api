import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [LoginController, RegisterController],
  providers: [LoginService, RegisterService],
  imports: [PrismaModule, UsersModule],
})
export class AuthModule {}
