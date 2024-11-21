import { Controller, Post, Body, Request, UseGuards, Get, Param, Patch, Delete, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
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

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string, @Request() req) {
      const userId = req.user.userId;
      if (!userId) {
          throw new BadRequestException('User ID is required');
      }

      if (!id || !ObjectId.isValid(id)) {
          throw new BadRequestException('Invalid document ID');
      }

      return this.userService.remove(id, userId);
  }
}
