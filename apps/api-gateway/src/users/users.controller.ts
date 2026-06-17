import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from '@app/shared';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Phone number already exists' })
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ status: 200, description: 'Found user id' })
  @ApiResponse({ status: 404, description: 'Not found user id' })
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @ApiOperation({ summary: 'Find user by phone' })
  @ApiResponse({ status: 200, description: 'Found user phone' })
  @ApiResponse({ status: 404, description: 'Not found user phone' })
  @Get('phone/:phone')
  findUserByPhone(@Param('phone') phone: string) {
    return this.usersService.findUserByPhone(phone);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not found user' })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
