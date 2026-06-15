import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TRIP_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL') ?? 'amqp://localhost:5672'],
            queue: 'trip_queue',
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
