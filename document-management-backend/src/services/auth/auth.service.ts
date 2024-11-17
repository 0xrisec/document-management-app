import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async login(username, userId, roles) {
        const payload = { username: username, sub: userId, roles };
        return {
            access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET_KEY}` }),
        };
    }
}
