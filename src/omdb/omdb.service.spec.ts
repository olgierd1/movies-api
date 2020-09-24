import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { OmdbService } from './omdb.service';
import { AxiosResponse } from 'axios';

describe('OmdbService', () => {
  let service: OmdbService
  let configService: ConfigService
  let httpService: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OmdbService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn()
          }
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<OmdbService>(OmdbService);
    configService = module.get<ConfigService>(ConfigService)
    httpService = module.get<HttpService>(HttpService)
  });

  describe('fetchMovie', () => {
    const mockMovie = { title: 'Lord of rings', year: 2005 }
    let fakeConfigService
   

    beforeEach(() => {
      fakeConfigService = jest.spyOn(configService, 'get').mockReturnValue('RESOURCE_BASE_URL')
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should throw NotFoundException when there is no movie Response', async () => {
      const fakeHttpService = jest.spyOn(httpService, 'get').mockImplementation(
        () => of({ data: { Response: 'False', Error: 'TEST' }}as AxiosResponse))

      let error: any
      try {
        await service.fetchMovie(mockMovie)
      } catch (e) {
        error = e
      }
      expect(fakeConfigService).toBeCalledWith('RESOURCE_BASE_URL')
      expect(fakeHttpService).toBeCalledWith(`RESOURCE_BASE_URL&t=${mockMovie.title}&y=${mockMovie.year}`)
      expect(error.message).toBe('TEST'),
      expect(error.status).toBe(404)
    })
    it('should return received data', async () => {
      const mockResponse = {Response: 'True', Title: 'A', Director: 'B'}
      jest.spyOn(httpService, 'get').mockImplementation(
        () => of({ data: mockResponse } as AxiosResponse))
      
      const actual = await service.fetchMovie({title: 'Dif'})
      expect(actual).toEqual(mockResponse)
    })
  })
});
