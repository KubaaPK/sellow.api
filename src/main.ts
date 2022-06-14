import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { initializeSwagger } from '@shared/infrastructure/swagger';
import { AppModule } from './app.module';
import { AppOptions } from './app.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appOptions = configService.get<AppOptions>('app');

  app.setGlobalPrefix(appOptions.api.prefix ?? '/');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

  initializeSwagger(app, configService);

  await app.listen(appOptions.port ?? 3000);
}
bootstrap();
