import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from './settings/logger';
import {
  LoggingInterceptor,
  ResponseInterceptor,
  TimeoutInterceptor,
} from './settings/interceptors';
import { ExceptionFiltering } from './settings/filter';
import { ValidationPipe } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);

  // app.enableCors({origin: ""})
  app.enableShutdownHooks();
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  app.useGlobalFilters(new ExceptionFiltering(logger));
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('/api/v1');
  const username = configService.get<string>('SWAGGER_USERNAME');
  const password = configService.get<string>('SWAGGER_PASSWORD');

  app.use(
    '/api/v1/docs',
    expressBasicAuth({
      challenge: true,
      users: {
        [username]: password,
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Walletfy API')
    .setDescription('API documentation')
    .setVersion('0.0.1')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/api/v1/docs`, app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });

  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    logger.log('APP', `Server listening on port ${port}`);
    logger.log(
      'APP',
      `Swagger UI available at http://localhost:${port}/api/v1/docs`,
    );
  });
}
bootstrap();
