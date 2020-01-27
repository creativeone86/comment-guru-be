import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';
import * as MUUID from 'uuid-mongodb';
import {PostsService} from "../posts/posts.service";

export type Comment = any;

@Injectable()
export class CommentsService {
    constructor(private readonly postsService: PostsService, @InjectModel('Comment') private readonly commentModel: Model<Comment>) {}

    async commentPost(userId, postId, content) {
        try {
            const post = await this.postsService.findOne(postId);
            // save the comment
            const comment = new this.commentModel({
                author: MUUID.from(userId),
                content
            });
            const newComment = await comment.save();
            post.comments.push(newComment._id);
            await post.save();

            return this.commentModel
                .findOne({_id: newComment._id})
                .select('content created')
                .sort({created: -1})
                .populate([
                    {
                        path: 'author',
                        select: 'username'
                    },
                ]);
        } catch (e) {
            return {};
        }
    }

    async findOne(commentId) {
        return this.commentModel.findOne({_id: MUUID.from(commentId)});
    }

    // async createPost(userId, content) {
    //     const post = new this.postModel({
    //         author: MUUID.from(userId),
    //         content
    //     });
    //     return post.save();
    // }

}
