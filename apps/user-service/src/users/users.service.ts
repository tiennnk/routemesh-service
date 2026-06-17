import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { CreateUserDto, LoginDto } from '@app/shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existUser = await this.usersRepo.findOneBy({
      phone: dto.phone,
    });

    if (existUser) {
      throw new ConflictException('Phone already exists!');
    }

    const user = this.usersRepo.create(dto);
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    user.password = hashedPassword;

    return this.usersRepo.save(user);
  }

  findUserById(id: number): Promise<User | null> {
    return this.usersRepo.findOneBy({ id });
  }

  findUserByPhone(phone: string): Promise<User | null> {
    return this.usersRepo.findOneBy({ phone });
  }

  async delete(id: number): Promise<void> {
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepo.delete(id);
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepo.findOneBy({ phone: dto.phone });
    if (!user) {
      throw new UnauthorizedException('User not exist');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Password not match');
    }

    const token = this.jwtService.sign({ sub: user.id, phone: user.phone, role: user.role });
    return { access_token: token };
  }
}
