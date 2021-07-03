import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from '@modules/auth/dtos/login-response.dto';
import { LoginDto } from '@modules/auth/dtos/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return {
      accessToken: await this.service.login(
        loginDto.username,
        loginDto.password,
      ),
    };
  }
}
