import { Controller, Post, Body, Request, UseGuards, Get, Param, Patch, Delete, BadRequestException, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ): Promise<void> {
    const userId = req.user.userId;
    if (!userId) {
        throw new BadRequestException('User ID is required');
    }
    this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
