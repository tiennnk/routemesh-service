import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DriversService } from './drivers.service';

import { CreateDriverDto, UpdateDriverStatusDto, DRIVER_PATTERNS } from '@app/shared';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  createDriver(@Body() dto: CreateDriverDto) {
    return this.driversService.createDriver(dto);
  }

  @Get(':id')
  getDriver(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.findDriverById(id);
  }

  @Patch(':id/status')
  updateDriverStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDriverStatusDto) {
    return this.driversService.updateDriverStatus(id, dto);
  }

  @Delete(':id')
  removeDriver(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.removeDriver(id);
  }

  @MessagePattern(DRIVER_PATTERNS.CREATE)
  handleCreateDriver(@Payload() dto: CreateDriverDto) {
    return this.driversService.createDriver(dto);
  }

  @MessagePattern(DRIVER_PATTERNS.FIND_BY_ID)
  handleFindDriverById(@Payload() id: number) {
    return this.driversService.findDriverById(id);
  }

  @MessagePattern(DRIVER_PATTERNS.UPDATE_STATUS)
  handleUpdateDriverStatus(@Payload() payload: { id: number; dto: UpdateDriverStatusDto }) {
    return this.driversService.updateDriverStatus(payload.id, payload.dto);
  }

  @MessagePattern(DRIVER_PATTERNS.DELETE)
  handleDeleteDriver(@Payload() id: number) {
    return this.driversService.removeDriver(id);
  }
}
