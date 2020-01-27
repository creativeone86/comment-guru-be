import { Injectable } from '@nestjs/common';
import * as MUUID from "uuid-mongodb";
import { Model } from 'mongoose';
import {InjectModel} from "@nestjs/mongoose";
import {CommentsService} from "../comments/comments.service";

export type Reply = any;

@Injectable()
export class RepliesService {
    constructor(private readonly commentsService: CommentsService, @InjectModel('Reply') private readonly replyModel: Model<Reply>) {}

    async replyToComment(userId, commentId, content) {
        //  console.log(`@postId`, MUUID.from(postId), typeof MUUID.from(postId))
        // check if the post exists at first place
        try {
            const comment = await this.commentsService.findOne(commentId);
            console.log(`@comment`, comment);
            // save the comment
            const reply = new this.replyModel({
                author: MUUID.from(userId),
                content
            });
            const newReply = await reply.save();
            comment.replies.push(newReply._id);
            return (await comment.save());
            //return post;
        } catch (e) {
            console.log(`eee`, e.message);
            return {}; // throw error
        }
        // save the comment
        // attach to post
        // get the latest
        // return this.postModel.find().sort({created: -1}).populate({
        //     path: 'author',
        //     select: 'username'
        // });
    }

}
