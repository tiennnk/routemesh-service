import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DriverType } from '../types/driver.types';

export class CreateDriverDto {
  @ApiProperty({ example: 'Tien Driver' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '0323456789' })
  @IsString()
  phone!: string;

  @ApiPropertyOptional({ example: 'driver@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ enum: DriverType })
  @IsEnum(DriverType)
  type?: DriverType;
}
