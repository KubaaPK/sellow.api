import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationModule } from '../../configuration';
import { DatabaseOptions } from './database.options';
import { TestUtilsService } from './test-utils.service';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = configService.get<DatabaseOptions>('database.test');

        return {
          type: 'postgres',
          ...options,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  providers: [TestUtilsService],
  exports: [TestUtilsService],
})
export class TestUtilsModule {}
