import { Expose, Transform } from 'class-transformer';

export class ReviewDto {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  rating: number;
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
