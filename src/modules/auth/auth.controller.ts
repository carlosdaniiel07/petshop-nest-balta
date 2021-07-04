import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from '@modules/auth/dtos/login-response.dto';
import { LoginDto } from '@modules/auth/dtos/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req: any): Promise<LoginResponseDto> {
    return {
      accessToken: await this.service.refreshToken(req.user),
    };
  }
}
