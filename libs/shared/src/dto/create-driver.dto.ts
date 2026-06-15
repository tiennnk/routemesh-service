import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { DriverType } from '../types/driver.types';

export class CreateDriverDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(DriverType)
  type?: DriverType;
}
