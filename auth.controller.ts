import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// TODO: Create a proper DTO for LoginDto (e.g., apps/api/src/modules/auth/dto/login.dto.ts)
// import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) { // TODO: Replace 'any' with LoginDto
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { user, message: 'Login successful' }; // TODO: Return JWT token here
  }
}