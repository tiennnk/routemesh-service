import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserRole } from '../../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Tien Nguyen' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  @Length(10, 10)
  @ApiProperty({ example: '0333456789' })
  phone!: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({ example: 'test@gmail.com' })
  email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiPropertyOptional({ enum: UserRole, example: UserRole.RIDER })
  role?: UserRole;
}
