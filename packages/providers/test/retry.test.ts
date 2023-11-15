import { RetryConfig } from '../src/retry-config';

describe('Retry mechanism wait durations', () => {
  test('fixed backoffs', () => {
    const maxAttempts = 5;
    const duration = 1000;
    const config = new RetryConfig({ maxAttempts, backoff: 'fixed', duration });

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const waitDuration = config.waitDuration(attempt);
      expect(waitDuration).toEqual(duration);
    }
  });

  test('linear backoffs', () => {
    const maxAttempts = 5;
    const duration = 1000;
    const config = new RetryConfig({ maxAttempts, backoff: 'linear', duration });

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const waitDuration = config.waitDuration(attempt);
      const expectedDuration = attempt === 1 ? duration : duration * (attempt + 1);
      expect(waitDuration).toEqual(expectedDuration);
    }
  });

  test('exponential backoffs', () => {
    const maxAttempts = 5;
    const duration = 1000;
    const config = new RetryConfig({ maxAttempts, backoff: 'linear', duration });

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const waitDuration = config.waitDuration(attempt);
      const expectedDuration = attempt === 1 ? duration : duration * (attempt + 1);

      expect(waitDuration).toEqual(expectedDuration);
    }
  });
});
