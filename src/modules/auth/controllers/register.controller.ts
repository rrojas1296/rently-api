import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { CookieOptions, type Response } from 'express';
import { IS_DEV } from 'src/config/environments';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() data: RegisterUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.registerService.registerUser(data);

    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: IS_DEV,
      sameSite: 'lax',
      path: '/',
    };
    res.cookie('accessToken', accessToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('refreshToken', refreshToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res
      .json({
        message: 'User created successfully',
        status: HttpStatus.CREATED,
      })
      .status(HttpStatus.CREATED);
  }
}
