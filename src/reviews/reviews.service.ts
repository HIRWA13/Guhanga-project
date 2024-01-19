import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from './entities/reviews.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReview } from './review';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  create(review: ProductReview, user: User) {
    const newReview = this.reviewRepository.create(review);
    newReview.user = user;
    return this.reviewRepository.save(newReview);
  }
}
