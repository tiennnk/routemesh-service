import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../types/user.types';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
