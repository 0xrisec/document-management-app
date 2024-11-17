import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStrategy } from 'src/services/auth/local.strategy';
import { JwtStrategy } from 'src/services/auth/jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
    exports: [AuthService],
})
export class AuthModule { }
