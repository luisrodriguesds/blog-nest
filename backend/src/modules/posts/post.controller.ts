import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './entities/post.entity';
import { ICreatePostDTO } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async index(): Promise<PostEntity[]> {
    const posts = await this.postService.findAll();

    return posts;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(
    @Body() data: ICreatePostDTO,
    @Request() req,
  ): Promise<PostEntity> {
    const post = await this.postService.create({
      ...data,
      user_id: req.user.id,
    });

    return post;
  }
}
