import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { verifyToken } from '../utils/verifyToken';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { generateTokens } from '../utils/generateTokens';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async validateSession({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    try {
      const userDB = await this.validateToken(accessToken, 'accessToken');
      const { id, email, firstName, lastName, role } = userDB;
      return {
        accessToken,
        isValid: userDB ? true : false,
        user: {
          id,
          email,
          firstName,
          lastName,
          role,
        },
      };
    } catch {
      if (!refreshToken) return { isValid: false };
      const newAccessToken = await this.refreshAccessToken(refreshToken);
      const userDB = await this.validateToken(newAccessToken, 'accessToken');
      const { id, email, firstName, lastName, role } = userDB;
      return {
        accessToken: newAccessToken,
        isValid: true,
        user: {
          id,
          email,
          firstName,
          lastName,
          role,
        },
      };
    }
  }

  private async refreshAccessToken(oldRefreshToken: string) {
    try {
      const userDB = await this.validateToken(oldRefreshToken, 'refreshToken');
      const { accessToken } = await generateTokens({
        sub: userDB.id,
        email: userDB.email,
      });
      return accessToken;
    } catch {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }
  }

  private async validateToken(
    token: string,
    type: 'accessToken' | 'refreshToken',
  ) {
    const { payload } = await verifyToken(token, type);
    const userId = payload.sub;
    if (!userId)
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    const userDB = await this.usersRepository.findById(userId);
    if (!userDB)
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    return userDB;
  }
}
