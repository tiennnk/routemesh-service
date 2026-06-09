import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get('phone/:phone')
  getUserByPhone(@Param('phone') phone: string) {
    return this.usersService.getUserByPhone(phone);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
