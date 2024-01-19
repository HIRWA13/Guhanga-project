import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  rating: number;
}
