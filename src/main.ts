import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe, Logger } from '@nestjs/common'
import { useContainer } from 'class-validator'
import { ExceptionsFilter } from './exception/exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['warn', 'error', 'log'],
    },
  )
  const configService = app.get(ConfigService)

  const prefix = 'api'
  app.setGlobalPrefix(prefix)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  )

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new ExceptionsFilter())

  await app.listen(configService.get('PORT'), '0.0.0.0')
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
