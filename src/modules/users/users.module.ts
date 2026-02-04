import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersProfileRepository } from './repositories/usersProfile.repository';

@Module({
  providers: [UsersRepository, UsersProfileRepository],
  exports: [UsersRepository, UsersProfileRepository],
})
export class UsersModule {}
