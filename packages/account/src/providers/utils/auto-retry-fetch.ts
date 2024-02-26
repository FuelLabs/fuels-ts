import { sleep } from '@fuel-ts/utils';

import type { ProviderOptions } from '../provider';

type Backoff = 'linear' | 'exponential' | 'fixed';

/**
 * Retry options scheme
 */
export type RetryOptions = {
  /**
   * Amount of attempts to retry before failing the call.
   */
  maxRetries: number;
  /**
   * Backoff strategy to use when retrying. Default is exponential.
   */
  backoff?: Backoff;
  /**
   * Starting delay for backoff strategy. Default is 150ms.
   */
  baseDelay?: number;
};

/**
 * Calculate the delay for the next retry attempt
 * @param options - Retry options configuration
 * @param retryAttemptNum - 1-based, tells which retry attempt is this
 * @returns Next wait delay
 */
export function getWaitDelay(options: RetryOptions, retryAttemptNum: number) {
  const duration = options.baseDelay ?? 150;

  switch (options.backoff) {
    case 'linear':
      return duration * retryAttemptNum;
    case 'fixed':
      return duration;
    case 'exponential':
    default:
      return 2 ** (retryAttemptNum - 1) * duration;
  }
}

/**
 * Returns a wrapped fetch function that will auto-execute itself in case of errors, until it succeeds
 * @param fetchFn - Function to be auto-retried
 * @param options - Retry options configuration
 * @param retryAttemptNum - ZERO=first call, ONE=first retry, TWO=second retry, etc.
 * @returns Whatever is the output of the `fetchFn` function
 */
export function autoRetryFetch(
  fetchFn: NonNullable<ProviderOptions['fetch']>,
  options?: RetryOptions,
  retryAttemptNum: number = 0
): NonNullable<ProviderOptions['fetch']> {
  if (options === undefined) {
    return fetchFn;
  }

  return async (...args) => {
    try {
      return await fetchFn(...args);
    } catch (_error: unknown) {
      const error = _error as Error & { cause?: { code: string } };

      /**
       * So far, we are auto-retrying only for `ECONNREFUSED` error.
       * TODO: Investigate if we should consider more errors.
       */
      if (error.cause?.code !== 'ECONNREFUSED') {
        throw error;
      }
      const retryNum = retryAttemptNum + 1;

      if (retryNum > options.maxRetries) {
        throw error;
      }

      const delay = getWaitDelay(options, retryNum);

      await sleep(delay);

      return autoRetryFetch(fetchFn, options, retryNum)(...args);
    }
  };
}
