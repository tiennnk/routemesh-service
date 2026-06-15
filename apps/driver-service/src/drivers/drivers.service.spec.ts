import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { DriversService } from './drivers.service';
import { Driver } from '../entities/driver.entity';
import { DriverType, DriverStatus } from '@app/shared';

const mockDriversRepo = {
  existsBy: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('DriversService', () => {
  let service: DriversService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: getRepositoryToken(Driver),
          useValue: mockDriversRepo,
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createDriver', () => {
    const dto = { name: 'Tien Driver', phone: '0333456789', type: DriverType.MOTORBIKE };

    it('create driver and return data', async () => {
      const savedDriver = { id: 1, ...dto, status: DriverStatus.OFFLINE } as Driver;
      mockDriversRepo.existsBy.mockResolvedValue(false);
      mockDriversRepo.create.mockReturnValue(savedDriver);
      mockDriversRepo.save.mockResolvedValue(savedDriver);

      const result = await service.createDriver(dto);

      expect(result).toEqual(savedDriver);
    });

    it('throw ConflictException if phone number exists', async () => {
      mockDriversRepo.existsBy.mockResolvedValue(true);

      await expect(service.createDriver(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findDriverById', () => {
    it('return driver data if id found', async () => {
      const driver = { id: 1, name: 'Tien Driver' } as Driver;
      mockDriversRepo.findOneBy.mockResolvedValue(driver);

      const result = await service.findDriverById(1);

      expect(result).toEqual(driver);
    });

    it('return null if id not found', async () => {
      mockDriversRepo.findOneBy.mockResolvedValue(null);

      const result = await service.findDriverById(999);

      expect(result).toBeNull();
    });
  });

  describe('updateDriverStatus', () => {
    it('update status and return updated driver', async () => {
      const driver = { id: 1, status: DriverStatus.OFFLINE } as Driver;
      const dto = { status: DriverStatus.ONLINE };
      mockDriversRepo.findOneBy.mockResolvedValue(driver);
      mockDriversRepo.save.mockResolvedValue({ ...driver, ...dto });

      const result = await service.updateDriverStatus(1, dto);

      expect(result.status).toBe(DriverStatus.ONLINE);
    });

    it('throw NotFoundException if driver not found', async () => {
      mockDriversRepo.findOneBy.mockResolvedValue(null);

      await expect(
        service.updateDriverStatus(999, { status: DriverStatus.ONLINE }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeDriver', () => {
    it('remove driver success', async () => {
      const driver = { id: 1 } as Driver;
      mockDriversRepo.findOneBy.mockResolvedValue(driver);
      mockDriversRepo.remove.mockResolvedValue(undefined);

      await expect(service.removeDriver(1)).resolves.toBeUndefined();
    });

    it('throw NotFoundException if driver not found', async () => {
      mockDriversRepo.findOneBy.mockResolvedValue(null);

      await expect(service.removeDriver(999)).rejects.toThrow(NotFoundException);
    });
  });
});
