import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ReplySchema} from "./schemas/reply.schema";
import {CommentsModule} from "../comments/comments.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Reply',
        useFactory: () => {
          const schema = ReplySchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    CommentsModule
  ],
  providers: [RepliesService],
  controllers: [RepliesController]
})
export class RepliesModule {}
