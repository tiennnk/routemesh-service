import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../types/trip.types';

export class UpdateTripStatusDto {
  @ApiProperty({ enum: TripStatus })
  @IsEnum(TripStatus)
  status!: TripStatus;
}
