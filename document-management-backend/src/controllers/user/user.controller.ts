import { Controller, Post, Body, Request, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';
import { LoginDto } from 'src/dto/login.dto';
import { SignupDto } from 'src/dto/signup.dto';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService, private jwtService:JwtService, private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignupDto) {
    return this.userService.register(body.username, body.name, body.email, body.password);
  }
  
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user: User = await this.userService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user.username, user.id, user.roles);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Patch(':id/role')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateUserRole(
    @Param('username') username: string,
    @Body('roles') roles: Role[],
  ) {
    return this.userService.updateUserRole(username, roles);
  }
}
