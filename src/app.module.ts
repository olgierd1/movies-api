import { HttpModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus'

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthController } from './health/health.controller';
import { CustomHealthIndicator } from './health/custom.health'
import { MoviesModule } from './movies/movies.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MoviesModule,
    HttpModule,
    CommentsModule
  ],
  controllers: [HealthController],
  providers: [CustomHealthIndicator],
})
export class AppModule {}
