import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateDriverDto, UpdateDriverStatusDto, DRIVER_PATTERNS } from '@app/shared';

@Injectable()
export class DriversService {
  constructor(
    @Inject('DRIVER_SERVICE')
    private readonly driverClient: ClientProxy,
  ) {}

  createDriver(dto: CreateDriverDto) {
    return firstValueFrom(this.driverClient.send(DRIVER_PATTERNS.CREATE, dto));
  }

  findDriverById(id: number) {
    return firstValueFrom(this.driverClient.send(DRIVER_PATTERNS.FIND_BY_ID, id));
  }

  updateDriverStatus(id: number, dto: UpdateDriverStatusDto) {
    return firstValueFrom(this.driverClient.send(DRIVER_PATTERNS.UPDATE_STATUS, { id, dto }));
  }

  deleteDriver(id: number) {
    return firstValueFrom(this.driverClient.send(DRIVER_PATTERNS.DELETE, id));
  }
}
