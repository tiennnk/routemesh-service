import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';

type UserResponse = {
  id: number;
  name: string;
  phone: string;
  email?: string;
  role?: string;
};

@Injectable()
export class UsersService {
  private readonly usersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const port = this.configService.get<string>('USER_SERVICE_PORT');
    this.usersUrl = `http://localhost:${port}/users`;
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const { data } = await firstValueFrom(this.httpService.post<UserResponse>(this.usersUrl, dto));

    return data;
  }

  async getUserById(id: number): Promise<UserResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserResponse>(`${this.usersUrl}/${id}`),
    );

    return data;
  }

  async getUserByPhone(phone: string): Promise<UserResponse> {
    const { data } = await firstValueFrom(
      this.httpService.get<UserResponse>(`${this.usersUrl}/${phone}`),
    );

    return data;
  }

  async deleteUserById(id: number): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.delete<void>(`${this.usersUrl}/${id}`));

    return data;
  }
}
