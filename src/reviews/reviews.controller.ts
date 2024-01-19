import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ReviewDto } from './dtos/review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @serialize(ReviewDto)
  create(@Body() review: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(review, user);
  }
}
