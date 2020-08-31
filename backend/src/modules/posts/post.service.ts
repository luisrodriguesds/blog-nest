import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { ICreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();

    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne(id);
    return post;
  }

  async create(data: ICreatePostDTO): Promise<Post> {
    const post = this.postsRepository.create(data);
    await this.postsRepository.save(post);

    return post;
  }
}
