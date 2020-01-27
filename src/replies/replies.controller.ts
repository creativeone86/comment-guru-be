import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {RepliesService} from "./replies.service";

@Controller('replies')
export class RepliesController {
    constructor(private readonly repliesService: RepliesService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async saveComment(@Request() req) {
        console.log(`req user`, req.user);
        return this.repliesService.replyToComment(
            req.user.userId,
            req.body.commentId,
            req.body.text
        );
    }

}
