import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { TripServiceModule } from './trip-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TripServiceModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: 'trip_queue',
      queueOptions: { durable: false },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Trip Service API')
    .setDescription('API docs for trip-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();

  const port = process.env.TRIP_SERVICE_PORT ?? 3003;
  await app.listen(port);
  console.log(`test port tripService: ${port}`);
}

bootstrap();
