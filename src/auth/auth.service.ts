import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './interfaces/auth.response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterRequestDto } from './interfaces/register.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(email);
    if (user === undefined || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return { token: await this.jwt.signAsync({ id: user.id }) };
  }

  async register(reg: RegisterRequestDto): Promise<string> {
    return await this.usersService.save(reg).then((user: UserEntity) => 'OK');
  }

  async profile(id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
