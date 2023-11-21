import { sleep } from './utils';

type Backoff = 'linear' | 'exponential' | 'fixed';

export interface RetryOptions {
  /**
   * Amount of attempts to retry before failing the call.
   */
  maxAttempts: number;
  /**
   * Backoff strategy to use when retrying.
   */
  backoff: Backoff;
  /**
   * Base duration for backoff strategy.
   */
  baseDuration: number;
}

function getWaitDuration(options: RetryOptions, attempt: number) {
  if (attempt === 0) {
    return options.baseDuration;
  }

  switch (options.backoff) {
    case 'linear':
      return options.baseDuration * attempt;
    case 'exponential':
      return options.baseDuration * (2 ^ (attempt - 1));
    case 'fixed':
      return options.baseDuration;
    default:
      throw new Error();
  }
}

export async function retrier(
  call: () => Promise<Response>,
  options: RetryOptions | undefined,
  retryAttempt: number = 0
) {
  if (options === undefined) {
    return call();
  }

  try {
    return await call();
  } catch (e: unknown) {
    const error = e as Error & { cause?: { code?: string } };

    if (error.cause?.code !== 'ECONNREFUSED') {
      throw e;
    }

    if (retryAttempt === options.maxAttempts) {
      throw e;
    }

    // eslint-disable-next-line no-param-reassign
    retryAttempt += 1;

    await sleep(getWaitDuration(options, retryAttempt));
    return retrier(call, options, retryAttempt);
  }
}
