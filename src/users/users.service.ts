import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(user: User):  Promise<any> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async findOne(username: string): Promise<any | undefined> {
        return this.userModel.findOne({username});
    }
}
