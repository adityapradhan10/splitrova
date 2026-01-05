import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto.email, dto.password);
  }
}
