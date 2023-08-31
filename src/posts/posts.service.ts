import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { userId } = createPostDto;
    const user = await this.UserRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found ');
    }
    const post = this.postRepo.create(createPostDto);
    post.user = user;
    return this.postRepo.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: { user: true } });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepo.findOne({ where: { id }, relations: { user: true } });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepo.update({ id }, { ...updatePostDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<number> {
    await this.postRepo.delete({ id });
    return id;
  }
}
