import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [LoginController, RegisterController, AuthController],
  providers: [LoginService, RegisterService, AuthService],
  imports: [PrismaModule, UsersModule],
})
export class AuthModule {}
