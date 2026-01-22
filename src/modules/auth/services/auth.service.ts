import { HttpException, Injectable } from '@nestjs/common';
import { verifyToken } from '../utils/verifyToken';
import { REFRESH_SECRET } from 'src/config/environments';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { generateTokens } from '../utils/generateTokens';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async refreshToken(oldRefreshToken?: string) {
    if (!oldRefreshToken) {
      throw new Error('Refresh token is required');
    }
    const secret = new TextEncoder().encode(REFRESH_SECRET);
    const { payload } = await verifyToken(oldRefreshToken, secret);
    const userId = payload.sub;
    if (!userId) {
      throw new HttpException('Token dosent has userId', 400);
    }
    const userDB = await this.usersRepository.findById(userId);
    if (!userDB) {
      throw new Error('User not found');
    }
    const { accessToken, refreshToken } = await generateTokens({
      sub: userDB.id,
      email: userDB.email,
    });
    return { accessToken, refreshToken };
  }
}
