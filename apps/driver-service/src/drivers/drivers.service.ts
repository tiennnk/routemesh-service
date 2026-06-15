import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Driver } from '../entities/driver.entity';
import { CreateDriverDto, UpdateDriverStatusDto } from '@app/shared';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async createDriver(dto: CreateDriverDto): Promise<Driver> {
    const phoneTaken = await this.driverRepository.existsBy({
      phone: dto.phone,
    });

    if (phoneTaken) {
      throw new ConflictException('Phone number is already in use');
    }

    const driver = this.driverRepository.create(dto);

    return this.driverRepository.save(driver);
  }

  findDriverById(id: number): Promise<Driver | null> {
    return this.driverRepository.findOneBy({ id });
  }

  async updateDriverStatus(id: number, dto: UpdateDriverStatusDto): Promise<Driver> {
    const driver = await this.getDriverOrFail(id);

    driver.status = dto.status;

    return this.driverRepository.save(driver);
  }

  async removeDriver(id: number): Promise<void> {
    const driver = await this.getDriverOrFail(id);

    await this.driverRepository.remove(driver);
  }

  private async getDriverOrFail(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOneBy({ id });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return driver;
  }
}
