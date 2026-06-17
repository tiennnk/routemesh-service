import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '1234456789' })
  @IsString()
  password!: string;

  @ApiProperty({ example: '0323456789' })
  @IsString()
  phone!: string;
}
