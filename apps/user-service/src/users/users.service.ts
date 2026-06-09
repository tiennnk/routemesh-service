import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existUser = await this.usersRepo.findOneBy({
      phone: dto.phone,
    });

    if (existUser) {
      throw new ConflictException('Phone already exists!');
    }

    const user = this.usersRepo.create(dto);
    return this.usersRepo.save(user);
  }

  findUserById(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  findUserByPhone(phone: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ phone });
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepo.delete(id);
  }
}
