import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {PostSchema} from "./schemas/post.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Post',
        useFactory: () => {
          const schema = PostSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
