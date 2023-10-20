import type { SSEOptions } from 'sse.js';
import { SSE } from 'sse.js';

export class Iterator<T, TReturn> implements AsyncIterableIterator<T>, AsyncIterator<T, TReturn> {
  constructor(url: string, options?: SSEOptions) {
    const sse = new SSE(url);
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<T> {
    throw new Error('Method not implemented.');
  }

  next(...args: []): Promise<IteratorResult<T, TReturn>> {
    throw new Error('Method not implemented.');
  }

  return?(value?: TReturn | PromiseLike<TReturn> | undefined): Promise<IteratorResult<T, TReturn>> {
    throw new Error('Method not implemented.');
  }

  throw?(e?: Error): Promise<IteratorResult<T, TReturn>> {
    throw new Error('Method not implemented.');
  }
}
