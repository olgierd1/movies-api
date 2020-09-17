import { CustomHealthIndicator } from './custom.health'

describe('CatsController', () => {
  let customHealthIndicator: CustomHealthIndicator;

  beforeEach(() => {
    customHealthIndicator = new CustomHealthIndicator();
  });

  describe('isHealthy', () => {
    it('should return true', async () => {
      expect(await customHealthIndicator.isHealthy()).toStrictEqual({
        healthy: {
          status: 'up'
        }
      });
    });
  });
});