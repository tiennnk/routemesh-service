import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { DriverServiceModule } from './driver-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DriverServiceModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: 'driver_queue',
      queueOptions: { durable: false },
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Driver Service API')
    .setDescription('API docs for driver-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  const port = process.env.DRIVER_SERVICE_PORT ?? 3002;
  await app.listen(port);
  console.log(`test port driverService ${port}`);
}
bootstrap();
