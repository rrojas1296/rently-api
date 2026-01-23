import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CookieOptions, type Request, type Response } from 'express';
import { IS_DEV } from 'src/config/environments';
import { sleep } from 'src/shared/utils/sleep';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  async logoutUser(@Res() res: Response) {
    await sleep(2000);
    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: IS_DEV,
      sameSite: 'lax',
      path: '/',
    };
    res.clearCookie('accessToken', {
      ...cookieBaseConfig,
      maxAge: 1000 * 10,
    });
    res.clearCookie('refreshToken', {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res
      .json({
        message: 'User logged out successfully',
        status: HttpStatus.OK,
      })
      .status(HttpStatus.OK);
  }

  @Get('validate')
  async validateToken(@Req() req: Request, @Res() res: Response) {
    const accessToken = (req.cookies['accessToken'] as string) ?? '';
    const refreshToken = (req.cookies['refreshToken'] as string) ?? '';
    const {
      accessToken: newAccessToken,
      isValid,
      user,
    } = await this.authService.validateSession({
      accessToken,
      refreshToken,
    });
    if (newAccessToken) {
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: IS_DEV,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 10,
      });
    }
    return res.json({
      message: 'Token validated successfully',
      status: 200,
      isValid,
      user,
    });
  }
}
