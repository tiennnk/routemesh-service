import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripStatusDto, AcceptTripDto } from '@app/shared';

@ApiTags('trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully' })
  @Post()
  createTrip(@Body() dto: CreateTripDto) {
    return this.tripsService.createTrip(dto);
  }

  @ApiOperation({ summary: 'Find trip by riderId' })
  @ApiResponse({ status: 200, description: 'Found trip' })
  @ApiResponse({ status: 404, description: 'Not found trip' })
  @Get('rider/:riderId')
  findTripsByRiderId(@Param('riderId', ParseIntPipe) riderId: number) {
    return this.tripsService.findTripsByRiderId(riderId);
  }

  @ApiOperation({ summary: 'Find trip by id' })
  @ApiResponse({ status: 200, description: 'Found trip id' })
  @ApiResponse({ status: 404, description: 'Not found trip id' })
  @Get(':id')
  getTripById(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.getTripById(id);
  }

  @ApiOperation({ summary: 'Accept a trip' })
  @ApiResponse({ status: 200, description: 'Trip accepted successfully' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Patch(':id/accept')
  acceptTrip(@Param('id', ParseIntPipe) id: number, @Body() dto: AcceptTripDto) {
    return this.tripsService.acceptTrip(id, dto);
  }

  @ApiOperation({ summary: 'Update trip status' })
  @ApiResponse({ status: 200, description: 'Trip updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Patch(':id/status')
  updateTripStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTripStatusDto) {
    return this.tripsService.updateTripStatus(id, dto);
  }

  @ApiOperation({ summary: 'Cancel a trip' })
  @ApiResponse({ status: 200, description: 'Trip canceled successfully' })
  @ApiResponse({ status: 400, description: 'Trip cannot be cancelled' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Patch(':id/cancel')
  cancelTrip(@Param('id', ParseIntPipe) id: number) {
    return this.tripsService.cancelTrip(id);
  }
}
