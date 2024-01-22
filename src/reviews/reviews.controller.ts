import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dtos/create-review.dto';
import { ReviewsService } from './reviews.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { ReviewDto } from './dtos/review.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}
  @ApiResponse({
    status: 201,
    description: 'The review has been successfully created.',
    type: ReviewDto,
  })
  @Post()
  @UseGuards(AuthGuard)
  @serialize(ReviewDto)
  create(@Body() review: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewsService.create(review, user);
  }
}
