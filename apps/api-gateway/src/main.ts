import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiGatewayPort = process.env.API_GATEWAY_PORT ?? 3000;
  await app.listen(apiGatewayPort);

  console.log(`API Gateway is running on port ${apiGatewayPort}`);
}
bootstrap();
