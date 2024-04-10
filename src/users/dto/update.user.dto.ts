import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
