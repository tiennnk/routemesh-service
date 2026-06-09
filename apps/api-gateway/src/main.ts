import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('API docs for api-gateway')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const apiGatewayPort = process.env.API_GATEWAY_PORT ?? 3000;
  await app.listen(apiGatewayPort);

  console.log(`test port API Gateway: ${apiGatewayPort}`);
}
bootstrap();
