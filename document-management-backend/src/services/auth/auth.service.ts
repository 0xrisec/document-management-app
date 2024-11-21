import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Redis from 'ioredis';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    private tokenBlacklist: Set<string> = new Set();
    private redisClient: Redis.Redis;

    private readonly jwtSecret = process.env.JWT_SECRET_KEY;

    async login(username, userId, roles) {
        const payload = { username: username, sub: userId, roles };
        return {
            access_token: this.jwtService.sign(payload, { secret: 'secret' }),
        };
    }

    validateToken(token: string): any {
        try {
            const decoded = this.jwtService.verify(token, { secret: 'secret' }); // Ensure the secret matches
            // const decoded = this.jwtService.verify(token);
            return { value: true, decoded };
        } catch (error) {
            return { value: false, error: error.message };
        }
    }

    logout(token: string): void {
        this.tokenBlacklist.add(token);
    }
}
