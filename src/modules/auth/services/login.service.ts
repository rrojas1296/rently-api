import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { comparePasswords } from '../utils/comparePasswords';
import { generateTokens } from '../utils/generateTokens';

@Injectable()
export class LoginService {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Post()
  async loginUser(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this.usersRepository.findByEmail(email);
    if (!user)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    const matchPasswords = await comparePasswords(password, user.password!);

    if (!matchPasswords)
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);

    const { accessToken, refreshToken } = await generateTokens({
      sub: user.id,
      email: user.email,
    });
    return { accessToken, refreshToken };
  }
}
