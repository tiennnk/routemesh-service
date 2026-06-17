import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { DriversService } from './drivers.service';
import { CreateDriverDto, UpdateDriverStatusDto } from '@app/shared';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({ status: 201, description: 'Driver created successfully' })
  @ApiResponse({ status: 409, description: 'Phone number already exists' })
  @Post()
  createDriver(@Body() dto: CreateDriverDto) {
    return this.driversService.createDriver(dto);
  }

  @ApiOperation({ summary: 'Find driver by id' })
  @ApiResponse({ status: 200, description: 'Found driver id' })
  @ApiResponse({ status: 404, description: 'Not found driver id' })
  @Get(':id')
  findDriverById(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.findDriverById(id);
  }

  @ApiOperation({ summary: 'Update driver status' })
  @ApiResponse({ status: 200, description: 'Driver updated successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Patch(':id/status')
  updateDriverStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDriverStatusDto) {
    return this.driversService.updateDriverStatus(id, dto);
  }

  @ApiOperation({ summary: 'Delete driver' })
  @ApiResponse({ status: 200, description: 'Driver deleted successfully' })
  @ApiResponse({ status: 404, description: 'Driver deleted not successfully' })
  @Delete(':id')
  deleteDriver(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.deleteDriver(id);
  }
}
