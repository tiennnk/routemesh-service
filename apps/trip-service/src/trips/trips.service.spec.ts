import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { TripsService } from './trips.service';
import { Trip } from '../entities/trip.entity';
import { TripStatus } from '@app/shared';

const mockTripsRepo = {
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripsService,
        {
          provide: getRepositoryToken(Trip),
          useValue: mockTripsRepo,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTrip', () => {
    it('create trip and return saved data', async () => {
      const dto = { riderId: 10, pickupAddress: '123 Pasteur', destination: '456 Nam Ky' };
      const trip = { id: 1, ...dto, status: TripStatus.PENDING } as Trip;
      mockTripsRepo.create.mockReturnValue(trip);
      mockTripsRepo.save.mockResolvedValue(trip);

      const result = await service.createTrip(dto);

      expect(mockTripsRepo.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(trip);
    });
  });

  describe('findTripById', () => {
    it('return trip if id found', async () => {
      const trip = { id: 1, status: TripStatus.PENDING } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      const result = await service.findTripById(1);

      expect(result).toEqual(trip);
    });

    it('return null if id not found', async () => {
      mockTripsRepo.findOneBy.mockResolvedValue(null);

      const result = await service.findTripById(999);

      expect(result).toBeNull();
    });
  });

  describe('acceptTrip', () => {
    it('assign driverId and set status to ACCEPTED', async () => {
      const trip = { id: 1, status: TripStatus.PENDING, driverId: undefined } as Trip;
      const updated = { ...trip, driverId: 5, status: TripStatus.ACCEPTED };
      mockTripsRepo.findOneBy.mockResolvedValue(trip);
      mockTripsRepo.save.mockResolvedValue(updated);

      const result = await service.acceptTrip(1, { driverId: 5 });

      expect(result.driverId).toBe(5);
      expect(result.status).toBe(TripStatus.ACCEPTED);
    });

    it('throw NotFoundException if trip not found', async () => {
      mockTripsRepo.findOneBy.mockResolvedValue(null);

      await expect(service.acceptTrip(999, { driverId: 5 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTripStatus', () => {
    it('update from ACCEPTED to IN_PROGRESS', async () => {
      const trip = { id: 1, status: TripStatus.ACCEPTED } as Trip;
      const updated = { ...trip, status: TripStatus.IN_PROGRESS };
      mockTripsRepo.findOneBy.mockResolvedValue(trip);
      mockTripsRepo.save.mockResolvedValue(updated);

      const result = await service.updateTripStatus(1, { status: TripStatus.IN_PROGRESS });

      expect(result.status).toBe(TripStatus.IN_PROGRESS);
    });

    it('update from IN_PROGRESS to COMPLETED', async () => {
      const trip = { id: 1, status: TripStatus.IN_PROGRESS } as Trip;
      const updated = { ...trip, status: TripStatus.COMPLETED };
      mockTripsRepo.findOneBy.mockResolvedValue(trip);
      mockTripsRepo.save.mockResolvedValue(updated);

      const result = await service.updateTripStatus(1, { status: TripStatus.COMPLETED });

      expect(result.status).toBe(TripStatus.COMPLETED);
    });

    it('throw BadRequestException when skipping status (PENDING to IN_PROGRESS)', async () => {
      const trip = { id: 1, status: TripStatus.PENDING } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      await expect(service.updateTripStatus(1, { status: TripStatus.IN_PROGRESS })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throw BadRequestException when going back to PENDING from ACCEPTED', async () => {
      const trip = { id: 1, status: TripStatus.ACCEPTED } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      await expect(service.updateTripStatus(1, { status: TripStatus.PENDING })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throw BadRequestException when updating a COMPLETED trip', async () => {
      const trip = { id: 1, status: TripStatus.COMPLETED } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      await expect(service.updateTripStatus(1, { status: TripStatus.CANCELLED })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throw NotFoundException if trip not found', async () => {
      mockTripsRepo.findOneBy.mockResolvedValue(null);

      await expect(service.updateTripStatus(999, { status: TripStatus.ACCEPTED })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('cancelTrip', () => {
    it('cancel a PENDING trip', async () => {
      const trip = { id: 1, status: TripStatus.PENDING } as Trip;
      const cancelled = { ...trip, status: TripStatus.CANCELLED };
      mockTripsRepo.findOneBy.mockResolvedValue(trip);
      mockTripsRepo.save.mockResolvedValue(cancelled);

      const result = await service.cancelTrip(1);

      expect(result.status).toBe(TripStatus.CANCELLED);
    });

    it('cancel an IN_PROGRESS trip', async () => {
      const trip = { id: 1, status: TripStatus.IN_PROGRESS } as Trip;
      const cancelled = { ...trip, status: TripStatus.CANCELLED };
      mockTripsRepo.findOneBy.mockResolvedValue(trip);
      mockTripsRepo.save.mockResolvedValue(cancelled);

      const result = await service.cancelTrip(1);

      expect(result.status).toBe(TripStatus.CANCELLED);
    });

    it('throw BadRequestException when cancelling a COMPLETED trip', async () => {
      const trip = { id: 1, status: TripStatus.COMPLETED } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      await expect(service.cancelTrip(1)).rejects.toThrow(BadRequestException);
    });

    it('throw BadRequestException when cancelling an already CANCELLED trip', async () => {
      const trip = { id: 1, status: TripStatus.CANCELLED } as Trip;
      mockTripsRepo.findOneBy.mockResolvedValue(trip);

      await expect(service.cancelTrip(1)).rejects.toThrow(BadRequestException);
    });

    it('throw NotFoundException if trip not found', async () => {
      mockTripsRepo.findOneBy.mockResolvedValue(null);

      await expect(service.cancelTrip(999)).rejects.toThrow(NotFoundException);
    });
  });
});
