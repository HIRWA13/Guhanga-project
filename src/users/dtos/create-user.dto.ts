import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Review } from 'src/reviews/entities/reviews.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'your name',
    required: true,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: '0787296874',
    required: true,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'youremail@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @IsString()
  password: string;
  reviews: Review[];
}
