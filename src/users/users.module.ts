import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import {UserSchema} from "./schemas/user.schema";
import {UsersController} from "./users.controller";


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
