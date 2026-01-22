import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { generateTokens } from '../utils/generateTokens';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class RegisterService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async registerUser(data: RegisterUserDto) {
    const userDB = await this.usersRepository.findByEmail(data.email);
    if (userDB) {
      throw new HttpException('User already exists', 400);
    }

    const passwordHashed = await hashPassword(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: passwordHashed,
    });

    const { access_token, refresh_token } = await generateTokens({
      sub: user.id,
      email: user.email,
    });

    return { access_token, refresh_token };
  }
}
