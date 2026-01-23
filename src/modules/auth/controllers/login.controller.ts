import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { type Response } from 'express';
import { IS_DEV } from 'src/config/environments';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async loginUser(@Body() data: LoginUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.loginService.loginUser(data);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: IS_DEV,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: IS_DEV,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.json({
      message: 'User logged successffully',
      status: 200,
    });
  }
}
