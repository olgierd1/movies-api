import { Test } from "@nestjs/testing";
import { INestApplication, Get, Controller, UseFilters, BadRequestException, Logger } from "@nestjs/common";
import * as request from 'supertest'
import { NestFastifyApplication, FastifyAdapter } from "@nestjs/platform-fastify";
import { ExceptionsFilter } from "./exceptions.filter";


@UseFilters(new ExceptionsFilter())
@Controller('dummy')
export class DummyController {
  @Get('custom')
  dummy(): void {
    throw new Error('custom')
  }
  @Get('http')
  custom(): boolean {
    throw new BadRequestException('Bad Request')
  }
}

describe('ExceptionsFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    Logger.error = jest.fn()
    const moduleRef = await Test.createTestingModule({
      controllers: [DummyController]
    })
    .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter(), {
      logger: false
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`should catch http exception`, () => {
    return request(app.getHttpServer())
      .get('/dummy/http')
      .expect(400)
      .expect({description:'Bad Request'});
  });
  it(`should catch custom exception`, () => {
    return request(app.getHttpServer())
      .get('/dummy/custom')
      .expect(500)
      .expect({statusCode: 500, message: 'Internal server error'});
  });

  afterAll(async () => {
    await app.close();
  });
})
