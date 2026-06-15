import { IsEnum } from 'class-validator';
import { DriverStatus } from '../types/driver.types';

export class UpdateDriverStatusDto {
  @IsEnum(DriverStatus)
  status?: DriverStatus;
}
