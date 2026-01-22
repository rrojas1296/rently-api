import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { type Request, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const oldRefreshToken = req.cookies['refreshToken'] as string;
    const { accessToken, refreshToken } =
      await this.authService.refreshToken(oldRefreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: 'Token refreshed successfully',
      status: 200,
    };
  }
}
