import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { generateTokens } from '../utils/generateTokens';
import { hashPassword } from '../utils/hashPassword';
import { UsersProfileRepository } from 'src/modules/users/repositories/usersProfile.repository';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly _usersProfileRepository: UsersProfileRepository,
  ) {}
  async registerUser(data: RegisterUserDto) {
    const userDB = await this.usersRepository.findByEmail(data.email);
    if (userDB) {
      throw new HttpException('user_already_exist', 400);
    }

    const passwordHashed = await hashPassword(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: passwordHashed,
    });
    await this._usersProfileRepository.create({
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    const { accessToken, refreshToken } = await generateTokens({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken };
  }
}
