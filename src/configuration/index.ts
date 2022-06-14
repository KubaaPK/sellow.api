import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import yamlConfigurationLoader from './yaml-configuration-loader';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [yamlConfigurationLoader],
    }),
  ],
})
export class ConfigurationModule {}
