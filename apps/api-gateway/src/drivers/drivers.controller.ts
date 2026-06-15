import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';

import { DriversService } from './drivers.service';
import { CreateDriverDto, UpdateDriverStatusDto } from '@app/shared';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  createDriver(@Body() dto: CreateDriverDto) {
    return this.driversService.createDriver(dto);
  }

  @Get(':id')
  findDriverById(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.getDriverById(id);
  }

  @Patch(':id/status')
  updateDriverStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDriverStatusDto) {
    return this.driversService.updateDriverStatus(id, dto);
  }

  @Delete(':id')
  deleteDriver(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.deleteDriver(id);
  }
}
