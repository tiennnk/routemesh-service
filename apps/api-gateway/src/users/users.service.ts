import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  createUser(dto: CreateUserDto) {
    return firstValueFrom(this.client.send('create_user', dto));
  }

  getUserById(id: number) {
    return firstValueFrom(this.client.send('get_user_by_id', id));
  }

  getUserByPhone(phone: string) {
    return firstValueFrom(this.client.send('get_user_by_phone', phone));
  }

  deleteUser(id: number) {
    return firstValueFrom(this.client.send('delete_user', id));
  }
}
