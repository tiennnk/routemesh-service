import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto } from '@app/shared';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  createTrip(@Body() dto: CreateTripDto) {
    return this.tripsService.createTrip(dto);
  }

  @Get('rider/:riderId')
  getTripsByRider(@Param('riderId', ParseIntPipe) riderId: number) {
    return this.tripsService.getTripsByRiderId(riderId);
  }

  @Get(':id')
  getTrip(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.getTripById(id);
  }

  @Patch(':id/accept')
  acceptTrip(@Param('id', ParseIntPipe) id: number, @Body() dto: AcceptTripDto) {
    return this.tripsService.acceptTrip(id, dto);
  }

  @Patch(':id/status')
  updateTripStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTripStatusDto) {
    return this.tripsService.updateTripStatus(id, dto);
  }

  @Patch(':id/cancel')
  cancelTrip(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.cancelTrip(id);
  }
}
