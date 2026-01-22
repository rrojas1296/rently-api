import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { type Response } from 'express';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() data: RegisterUserDto, @Res() res: Response) {
    const { access_token, refresh_token } =
      await this.registerService.registerUser(data);
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
      message: 'User registered successfully',
      status: 200,
    };
  }
}
