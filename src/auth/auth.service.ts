import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) {// the user does not exist, create one and pass it for login
            try {
                return this.usersService.create({username, password});
            } catch (e) {
                return null;
            }
        } else if (!user.validPassword(password)) {// the user exist but the password is wrong
            return null;
        } else {// our user is validated and ready to login
            return user;
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id.toString() };
        return {
            access_token: this.jwtService.sign(payload),
            username: user.username
        };
    }
}
