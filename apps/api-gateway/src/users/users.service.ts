import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateUserDto, USER_PATTERNS } from '@app/shared';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  createUser(dto: CreateUserDto) {
    return firstValueFrom(this.client.send(USER_PATTERNS.CREATE, dto));
  }

  findUserById(id: number) {
    return firstValueFrom(this.client.send(USER_PATTERNS.FIND_BY_ID, id));
  }

  findUserByPhone(phone: string) {
    return firstValueFrom(this.client.send(USER_PATTERNS.FIND_BY_PHONE, phone));
  }

  deleteUser(id: number) {
    return firstValueFrom(this.client.send(USER_PATTERNS.DELETE, id));
  }
}
