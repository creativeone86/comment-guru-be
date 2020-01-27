import {Controller, Get, Post, Query, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {PostsService} from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllPosts(
        @Request() req,
        @Query('sort') sort,
        @Query('page') page,
        @Query('limit') limit
    ) {
        return this.postsService.getPosts(sort, page, limit);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async savePost(@Request() req) {
        return this.postsService.createPost(req.user.userId, req.body.content);

    }

}
