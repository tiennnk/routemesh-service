import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { LoginDto, USER_PATTERNS } from '@app/shared';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  login(dto: LoginDto) {
    return firstValueFrom(this.client.send(USER_PATTERNS.LOGIN, dto));
  }
}
