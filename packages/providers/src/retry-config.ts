import { sleep } from './utils';

type Backoff = 'linear' | 'exponential' | 'fixed';

interface RetryOptions {
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
  duration: number;
}

export class RetryConfig {
  private backoff: Backoff;
  private duration: number;
  /**
   * Amount of attempts to try after first call fails.
   */
  maxAttempts: number;
  /**
   *
   */
  constructor(options: RetryOptions) {
    if (options.maxAttempts <= 0) throw new Error();
    this.backoff = options.backoff;
    this.duration = options.duration;
    this.maxAttempts = options.maxAttempts;
  }

  waitDuration(attempt: number) {
    switch (this.backoff) {
      case 'linear':
        return this.duration * attempt;
      case 'exponential':
        return this.duration * (2 ^ (attempt - 1));
      case 'fixed':
        return this.duration;
      default:
        throw new Error();
    }
  }

  static async retryable<Call extends (...args: unknown[]) => Promise<Response>>(
    config: RetryConfig | undefined,
    call: Call
  ) {
    if (config === undefined) return call();

    let retryAttempt = 0;
    do {
      try {
        return await call();
      } catch (e: unknown) {
        const error = e as Error & { cause?: { code?: string } };

        if (error.cause?.code !== 'ECONNREFUSED') throw e;

        retryAttempt += 1;

        if (retryAttempt > config.maxAttempts) throw e;

        await sleep(config.waitDuration(retryAttempt));
      }
      // eslint-disable-next-line no-constant-condition
    } while (true);
  }
}
