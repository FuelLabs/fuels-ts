import type { ProviderOptions } from './provider';
import { sleep } from './utils';

type Backoff = 'linear' | 'exponential' | 'fixed';

export interface RetryOptions {
  /**
   * Amount of attempts to retry before failing the call.
   */
  maxRetries: number;
  /**
   * Backoff strategy to use when retrying. Default is exponential.
   */
  backoff?: Backoff;
  /**
   * Base duration for backoff strategy. Default is 150ms.
   */
  baseDuration?: number;
}

function getWaitDuration(options: RetryOptions, attempt: number) {
  const duration = options.baseDuration ?? 150;

  if (attempt === 0) {
    return duration;
  }

  switch (options.backoff) {
    case 'linear':
      return duration * attempt;
    case 'fixed':
      return duration;
    case 'exponential':
    default:
      return duration * (2 ^ (attempt - 1));
  }
}

export function retrier(
  fetchFn: NonNullable<ProviderOptions['fetch']>,
  options: RetryOptions | undefined,
  retryAttempt: number = 0
): NonNullable<ProviderOptions['fetch']> {
  if (options === undefined) {
    return fetchFn;
  }

  return async (...args) => {
    try {
      return await fetchFn(...args);
    } catch (e: unknown) {
      const error = e as Error & { cause?: { code?: string } };

      if (error.cause?.code !== 'ECONNREFUSED') {
        throw e;
      }

      if (retryAttempt === options.maxRetries) {
        throw e;
      }

      // eslint-disable-next-line no-param-reassign
      retryAttempt += 1;

      await sleep(getWaitDuration(options, retryAttempt));

      return retrier(fetchFn, options, retryAttempt)(...args);
    }
  };
}
