import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  const userServicePort = process.env.USER_SERVICE_PORT ?? 3001;
  await app.listen(userServicePort);

  console.log(`User Service is running on port ${userServicePort}`);
}
bootstrap();
