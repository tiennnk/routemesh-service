import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../types/user.types';

export class CreateUserDto {
  @ApiProperty({ example: 'Tien Nguyen' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '0323456789' })
  @IsString()
  phone!: string;

  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
