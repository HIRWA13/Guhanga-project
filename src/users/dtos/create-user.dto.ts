import { IsEmail, IsString } from 'class-validator';
import { Review } from 'src/reviews/entities/reviews.entity';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  reviews: Review[];
}
