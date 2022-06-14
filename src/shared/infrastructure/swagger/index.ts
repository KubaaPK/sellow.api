import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerOptions } from './swagger.options';

export const initializeSwagger = (
  app: INestApplication,
  configService: ConfigService,
): void => {
  const options = configService.get<SwaggerOptions>('swagger');

  const config = new DocumentBuilder().setTitle(options.title).build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(options.url, app, document);
};
