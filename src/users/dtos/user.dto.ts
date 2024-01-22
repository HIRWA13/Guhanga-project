import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    example: 'User id',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Your Name',
  })
  @Expose()
  fullName: string;
}
