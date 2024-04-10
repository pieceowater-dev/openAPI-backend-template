import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { PaginatedList } from '../utils/paginated.list';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthTypes } from '../auth/enums/auth.types';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('Users')
@UseGuards(AuthGuard)
@ApiBearerAuth(AuthTypes.JWT)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.save(createUserDto);
  }

  @Patch('/update')
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.usersService.save(updateUserDto);
  }

  @Post('')
  async userList(): Promise<PaginatedList<UserEntity>> {
    return await this.usersService.findPaginatedMany();
  }

  @Get('/:id')
  async createUSer(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }
}
