import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: 'DRIVER_SERVICE',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [config.get<string>('RABBITMQ_URL') ?? 'amqp://localhost:5672'],
          queue: 'driver_queue',
          queueOptions: { durable: false },
        },
      }),
    }]),
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
