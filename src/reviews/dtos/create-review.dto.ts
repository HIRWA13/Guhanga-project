import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Review Title',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Your Review',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Rating to 5',
    required: true,
  })
  @IsNumber()
  rating: number;
}
