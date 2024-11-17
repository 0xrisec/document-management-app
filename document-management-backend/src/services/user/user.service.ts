import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(username: string, name: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            name,
            email,
            password: hashedPassword,
            roles: [Role.User],
            createdAt: new Date(), // Current date
        });

        return this.userRepository.save(user);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const { email, ...result } = user;
            return result;
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(username: string): Promise<User> {
        // Convert the string ID to ObjectId (MongoDB)
        const user = await this.userRepository.findOne({
            where: { username: username }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUserRole(username: string, roles: Role[]): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found');
        }
        user.roles = roles;
        return this.userRepository.save(user);
    }

}
