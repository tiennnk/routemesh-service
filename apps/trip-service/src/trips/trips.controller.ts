import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto, TRIP_PATTERNS } from '@app/shared';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  createTrip(@Body() dto: CreateTripDto) {
    return this.tripsService.createTrip(dto);
  }

  @Get(':id')
  getTrip(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.findTripById(id);
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

  @MessagePattern(TRIP_PATTERNS.CREATE)
  handleCreateTrip(@Payload() dto: CreateTripDto) {
    return this.tripsService.createTrip(dto);
  }

  @MessagePattern(TRIP_PATTERNS.FIND_BY_ID)
  handleFindTripById(@Payload() id: number) {
    return this.tripsService.findTripById(id);
  }

  @MessagePattern(TRIP_PATTERNS.FIND_BY_RIDER)
  handleFindTripsByRider(@Payload() riderId: number) {
    return this.tripsService.findTripsByRiderId(riderId);
  }

  @MessagePattern(TRIP_PATTERNS.ACCEPT)
  handleAcceptTrip(@Payload() payload: { id: number; dto: AcceptTripDto }) {
    return this.tripsService.acceptTrip(payload.id, payload.dto);
  }

  @MessagePattern(TRIP_PATTERNS.UPDATE_STATUS)
  handleUpdateTripStatus(@Payload() payload: { id: number; dto: UpdateTripStatusDto }) {
    return this.tripsService.updateTripStatus(payload.id, payload.dto);
  }

  @MessagePattern(TRIP_PATTERNS.CANCEL)
  handleCancelTrip(@Payload() id: number) {
    return this.tripsService.cancelTrip(id);
  }
}
