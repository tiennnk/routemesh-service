import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, DriversModule, TripsModule],
})
export class AppModule {}
