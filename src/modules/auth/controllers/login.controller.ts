import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { type Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async loginUser(@Body() data: LoginUserDto, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.loginService.loginUser(data);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return {
      message: 'User logged successffully',
      status: 200,
    };
  }
}
