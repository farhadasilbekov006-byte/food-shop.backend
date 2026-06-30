import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body() body: {email: string, password: string}) {
      return this.authService.login(body.email, body.password);
    }

    @Post('register') 
    register(@Body() dto:  RegisterDto) {
        return this.authService.register(dto)
    }
}