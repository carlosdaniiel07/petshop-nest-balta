import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorHandler } from '@shared/middlewares/global-error-handler.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalErrorHandler());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PetShop API')
    .setDescription('API desenvolvida com NestJs no curso 7180 do balta.io')
    .setVersion('1.0')
    .build();
  const swagger = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swagger);

  await app.listen(3000);
}
bootstrap();
