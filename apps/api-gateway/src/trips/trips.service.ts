import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto, TRIP_PATTERNS } from '@app/shared';

@Injectable()
export class TripsService {
  constructor(@Inject('TRIP_SERVICE') private readonly client: ClientProxy) {}

  createTrip(dto: CreateTripDto) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.CREATE, dto));
  }

  getTripById(id: number) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.FIND_BY_ID, id));
  }

  getTripsByRiderId(riderId: number) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.FIND_BY_RIDER, riderId));
  }

  acceptTrip(id: number, dto: AcceptTripDto) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.ACCEPT, { id, dto }));
  }

  updateTripStatus(id: number, dto: UpdateTripStatusDto) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.UPDATE_STATUS, { id, dto }));
  }

  cancelTrip(id: number) {
    return firstValueFrom(this.client.send(TRIP_PATTERNS.CANCEL, id));
  }
}
