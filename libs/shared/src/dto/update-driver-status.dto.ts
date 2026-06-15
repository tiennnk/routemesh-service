import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DriverStatus } from '../types/driver.types';

export class UpdateDriverStatusDto {
  @ApiProperty({ enum: DriverStatus })
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
