import {Controller, Get, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {User, UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return  (await this.usersService.create(createUserDto));
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException(`The name already exists`, HttpStatus.CONFLICT);
            } else {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);

            }
        }
    }
}
