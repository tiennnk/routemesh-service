import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';
import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto, TripStatus } from '@app/shared';

const VALID_TRANSITIONS: Record<TripStatus, TripStatus[]> = {
  [TripStatus.PENDING]: [TripStatus.ACCEPTED, TripStatus.CANCELLED],
  [TripStatus.ACCEPTED]: [TripStatus.IN_PROGRESS, TripStatus.CANCELLED],
  [TripStatus.IN_PROGRESS]: [TripStatus.COMPLETED, TripStatus.CANCELLED],
  [TripStatus.COMPLETED]: [],
  [TripStatus.CANCELLED]: [],
};

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  createTrip(dto: CreateTripDto): Promise<Trip> {
    const trip = this.tripRepository.create(dto);
    return this.tripRepository.save(trip);
  }

  findTripById(id: number): Promise<Trip | null> {
    return this.tripRepository.findOneBy({ id });
  }

  findTripsByRiderId(riderId: number): Promise<Trip[]> {
    return this.tripRepository.findBy({ riderId });
  }

  async acceptTrip(id: number, dto: AcceptTripDto): Promise<Trip> {
    const trip = await this.getTripOrFail(id);

    const validNextStatus = VALID_TRANSITIONS[trip.status];
    if (!validNextStatus.includes(TripStatus.ACCEPTED)) {
      throw new BadRequestException(`cannot accept trip with status ${trip.status}`);
    }

    trip.driverId = dto.driverId;
    trip.status = TripStatus.ACCEPTED;
    return this.tripRepository.save(trip);
  }

  async updateTripStatus(id: number, dto: UpdateTripStatusDto): Promise<Trip> {
    const trip = await this.getTripOrFail(id);

    const oldStatus = trip.status;
    const newStatus = dto.status;

    const validNextStatus = VALID_TRANSITIONS[oldStatus];

    if (!validNextStatus.includes(newStatus)) {
      throw new BadRequestException(`Cannot update status from ${oldStatus} to ${newStatus}`);
    }

    trip.status = dto.status;
    return this.tripRepository.save(trip);
  }

  async cancelTrip(id: number): Promise<Trip> {
    const trip = await this.getTripOrFail(id);

    const validNextStatus = VALID_TRANSITIONS[trip.status];

    if (!validNextStatus.includes(TripStatus.CANCELLED)) {
      throw new BadRequestException(
        `Cannot update status from ${trip.status} to ${TripStatus.CANCELLED}`,
      );
    }

    trip.status = TripStatus.CANCELLED;

    return this.tripRepository.save(trip);
  }

  private async getTripOrFail(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }
}
