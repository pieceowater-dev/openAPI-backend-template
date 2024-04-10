import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './interfaces/auth.request.dto';
import { AuthResponseDto } from './interfaces/auth.response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from './enums/auth.types';
import { RegisterRequestDto } from './interfaces/register.request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<string> {
    return await this.authService.register(registerRequestDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth(AuthTypes.JWT)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async profile(@Req() req: any): Promise<UserEntity> {
    return await this.authService.profile(req?.user?.id);
  }
}
