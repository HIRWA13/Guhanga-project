import { IsNumber, IsString } from 'class-validator';

export class ProductReview {
  @IsString()
  title: string;
  @IsString()
  description: string;

  @IsNumber()
  rating: number;
}
