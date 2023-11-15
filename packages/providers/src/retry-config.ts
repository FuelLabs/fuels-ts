type Backoff = 'linear' | 'exponential' | 'fixed';

interface RetryOptions {
  maxAttempts: number;
  backoff: Backoff;
  duration: number;
}

export class RetryConfig {
  private backoff: Backoff;
  private duration: number;
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
    if (attempt === 1) return this.duration;
    switch (this.backoff) {
      case 'linear':
        return this.duration * (attempt + 1);
      case 'exponential':
        return this.duration * (2 ^ attempt);
      case 'fixed':
        return this.duration;
      default:
        throw new Error();
    }
  }
}
