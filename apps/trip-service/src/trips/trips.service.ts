import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from '../entities/trip.entity';
import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto, TripStatus } from '@app/shared';

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

  async acceptTrip(id: number, dto: AcceptTripDto): Promise<Trip> {
    const trip = await this.getTripOrFail(id);
    trip.driverId = dto.driverId;
    trip.status = TripStatus.ACCEPTED;
    return this.tripRepository.save(trip);
  }

  async updateTripStatus(id: number, dto: UpdateTripStatusDto): Promise<Trip> {
    const trip = await this.getTripOrFail(id);
    trip.status = dto.status;
    return this.tripRepository.save(trip);
  }

  async cancelTrip(id: number): Promise<Trip> {
    const trip = await this.getTripOrFail(id);
    trip.status = TripStatus.CANCELLED;
    return this.tripRepository.save(trip);
  }

  private async getTripOrFail(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }
}
