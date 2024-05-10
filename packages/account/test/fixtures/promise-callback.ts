import type { Mock } from 'vitest';

import { type DeferPromise, deferPromise } from '../../src/connectors/utils';

export type PromiseCallback = Mock & {
  promise: DeferPromise;
};

export function promiseCallback() {
  const defer = deferPromise();

  const mockFn: any = vi.fn();

  mockFn.mockImplementation((...args: unknown[]) => {
    defer.resolve(args);
  });
  mockFn.promise = defer.promise;

  return mockFn as PromiseCallback;
}
