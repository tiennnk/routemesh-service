import { Controller, Param, Get, Post, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @MessagePattern('create_user')
  createUserMQ(@Payload() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @MessagePattern('get_user_by_id')
  getUserByIdMQ(id: number) {
    return this.usersService.findUserById(id);
  }

  @MessagePattern('get_user_by_phone')
  getUserByPhoneMQ(phone: string) {
    return this.usersService.findUserByPhone(phone);
  }

  @MessagePattern('delete_user')
  deleteUserMQ(id: number) {
    return this.usersService.delete(id);
  }
}
