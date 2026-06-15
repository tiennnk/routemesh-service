import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  riderId!: number;

  @ApiProperty({ example: '123 Pasteur, Phuong Ben Nghe, District 1' })
  @IsString()
  pickupAddress!: string;

  @ApiProperty({ example: '456 Nam Ky Khoi Nghia, District 3' })
  @IsString()
  destination!: string;
}
