import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from './entities/post.entity';

@Resolver('posts')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPost') createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Query(() => [Post])
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  async getOnePost(@Args('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @Mutation(() => Post)
  async updateOnePost(
    @Args('id') id: number,
    @Args('updatePost') updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Mutation(() => Number)
  async deleteOnePost(@Args('id', { type: () => ID }) id: number) {
    return this.postsService.remove(+id);
  }
}
