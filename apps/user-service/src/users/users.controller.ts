import { Controller, Param, Get, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { CreateUserDto, USER_PATTERNS } from '@app/shared';

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
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @MessagePattern(USER_PATTERNS.CREATE)
  createUserMQ(@Payload() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @MessagePattern(USER_PATTERNS.FIND_BY_ID)
  getUserByIdMQ(id: number) {
    return this.usersService.findUserById(id);
  }

  @MessagePattern(USER_PATTERNS.FIND_BY_PHONE)
  getUserByPhoneMQ(phone: string) {
    return this.usersService.findUserByPhone(phone);
  }

  @MessagePattern(USER_PATTERNS.DELETE)
  deleteUserMQ(id: number) {
    return this.usersService.delete(id);
  }
}
