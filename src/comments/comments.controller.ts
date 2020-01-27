import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CommentsService} from "./comments.service";

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async saveComment(@Request() req) {
        return this.commentsService.commentPost(
            req.user.userId,
            req.body.postId,
            req.body.content
        );
    }

}
