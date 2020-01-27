import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { RepliesModule } from './replies/replies.module';

@Module({
  imports: [
      MongooseModule.forRoot(`${process.env.DB_URL}`),
      AuthModule,
      UsersModule,
      PostsModule,
      CommentsModule,
      RepliesModule
  ],
  controllers: [AppController]
})
export class AppModule {}
