import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptTripDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  driverId!: number;
}
