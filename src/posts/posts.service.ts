import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import * as MUUID from 'uuid-mongodb';

export type Post = any;

@Injectable()
export class PostsService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {
    }

    async getPosts(sort = -1, page = 0, limit) {
        limit = parseInt(limit, 10) || 10
        return this.postModel
            .find()
            .select('content created postId')
            .sort({created: sort})
            .skip((page * limit))
            .limit(limit)
            .populate([
                {
                    path: 'author',
                    select: 'username'
                },
                {
                    path: 'comments',
                    options: {sort: {created: -1}},
                    populate: [
                        {
                            path: 'author',
                            select: 'username'
                        },
                        {
                            path: 'replies',
                            options: {sort: {created: -1}},
                            populate: {
                                path: 'author',
                                select: 'username'
                            }
                        }
                    ]
                }
            ]);
    }

    async createPost(userId, content) {
        const post = new this.postModel({
            author: MUUID.from(userId),
            content
        });
        return post.save();
    }

    async findOne(postId) {
        return this.postModel.findOne({_id: MUUID.from(postId)});
    }
}
