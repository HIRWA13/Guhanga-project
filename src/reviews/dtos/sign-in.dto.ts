import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'youremail@example.com',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'your password',
    required: true,
  })
  @IsString()
  password: string;
}
