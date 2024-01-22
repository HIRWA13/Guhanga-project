import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReviewDto {
  @ApiProperty({
    example: 'Review title',
  })
  @Expose()
  title: string;
  @ApiProperty({
    example: 'review description',
  })
  @Expose()
  description: string;
  @ApiProperty({
    example: 'rating',
  })
  @Expose()
  rating: number;
  @ApiProperty({
    example: 'review id',
  })
  @Expose()
  id: number;
  @ApiProperty({
    example: 'created at',
  })
  @Expose()
  createdAt: Date;
  @ApiProperty({
    example: 'user id',
  })
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
