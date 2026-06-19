import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from '@app/shared';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in with phone number and password' })
  @ApiResponse({ status: 200, description: 'Login successful, JWT access_token returned' })
  @ApiResponse({ status: 401, description: 'Phone number or password is invalid' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
