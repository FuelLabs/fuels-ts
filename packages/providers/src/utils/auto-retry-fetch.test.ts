import { safeExec } from '@fuel-ts/errors/test-utils';

import type { FetchRequestOptions } from '../provider';

import type { RetryOptions } from './auto-retry-fetch';
import { autoRetryFetch, getWaitDelay } from './auto-retry-fetch';

/**
 * @group node
 */
describe('getWaitDelay', () => {
  const maxRetries = 10;
  const baseDelay = 10;

  it('should get wait delay for linear backoff strategy', () => {
    const options: RetryOptions = { maxRetries, baseDelay, backoff: 'linear' };
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const delay = getWaitDelay(options, attempt);
      expect(delay).toEqual(baseDelay * attempt); // linear
    }
  });

  it('should get wait delay for fixed backoff strategy', () => {
    const options: RetryOptions = { maxRetries, baseDelay, backoff: 'fixed' };
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const delay = getWaitDelay(options, attempt);
      expect(delay).toEqual(baseDelay); // fixed
    }
  });

  it('should get wait delay for exponential backoff strategy', () => {
    const options: RetryOptions = { maxRetries, baseDelay, backoff: 'exponential' };
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const delay = getWaitDelay(options, attempt);
      expect(delay).toEqual(2 ** (attempt - 1) * baseDelay); // exponential
    }
  });

  it('default strategy should be exponential', () => {
    const options: RetryOptions = { maxRetries, baseDelay }; // omitting `backoff`
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const delay = getWaitDelay(options, attempt);
      expect(delay).toEqual(2 ** (attempt - 1) * baseDelay); // exponential
    }
  });

  it('default baseDelay should be 150', () => {
    const defaultDuration = 150;
    const options: RetryOptions = { maxRetries, backoff: 'fixed' }; // omitting `baseDelay`
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const delay = getWaitDelay(options, attempt);
      expect(delay).toEqual(defaultDuration);
    }
  });
});

describe('autoRetryFetch', () => {
  const url = 'http://anythibng.com';
  const fetchOptions: FetchRequestOptions = { method: 'POST', headers: {}, body: '' };

  const maxRetries = 5;
  const baseDelay = 1;
  const retryOptions: RetryOptions = { maxRetries, baseDelay, backoff: 'fixed' };

  it('should not wrap function by default', async () => {
    const fn = vi.fn(() => {
      throw new Error('anything');
    });

    const autoRetry = autoRetryFetch(fn);

    const { error, result } = await safeExec(async () => autoRetry(url, fetchOptions, {}));

    expect(fn).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
    expect(error).toMatch(/anything/);
  });

  it('should retry until maxRetries and fail', async () => {
    const fn = vi.fn(() => {
      throw new Error('anything');
    });

    const autoRetry = autoRetryFetch(fn, retryOptions);

    const { error, result } = await safeExec(async () => autoRetry(url, fetchOptions, {}));

    expect(fn).toHaveBeenCalledTimes(maxRetries);
    expect(result).toBeFalsy();
    expect(error).toMatch(/anything/);
  });

  it('should retry until maxRetries and succeed', async () => {
    let calls = 0;

    const fn = vi.fn(() => {
      if (++calls === maxRetries) {
        return Promise.resolve(new Response());
      }
      throw new Error('anything');
    });

    const autoRetry = autoRetryFetch(fn, retryOptions);

    const { error, result } = await safeExec(async () => autoRetry(url, fetchOptions, {}));

    expect(fn).toHaveBeenCalledTimes(maxRetries);
    expect(result).toBeInstanceOf(Response);
    expect(error).toBeFalsy();
  });
});
