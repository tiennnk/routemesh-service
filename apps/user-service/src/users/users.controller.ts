import { Controller, Param, Get, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Get('phone/:phone')
  getUserByPhone(@Param('phone') phone: string) {
    return this.usersService.findUserByPhone(phone);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }
}
