import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from "@nestjs/mongoose";
import { CommentsController } from './comments.controller';
import {PostsModule} from "../posts/posts.module";
import {CommentSchema} from "./schemas/comment.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Comment',
        useFactory: () => {
          const schema = CommentSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
      PostsModule
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService]
})
export class CommentsModule {}
