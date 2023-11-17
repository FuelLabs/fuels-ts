import { safeExec } from '@fuel-ts/errors/test-utils';

import Provider from '../src/provider';
import { RetryConfig } from '../src/retry-config';

const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

describe('Retries correctly', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    {
      backoff: 'fixed' as const,
      backoffFn: (duration: number) => duration,
    },
    {
      backoff: 'linear' as const,
      backoffFn: (duration: number, attempt: number) => duration * attempt,
    },
    {
      backoff: 'exponential' as const,
      backoffFn: (duration: number, attempt: number) => duration * (2 ^ (attempt - 1)),
    },
  ])('retries until successful: $backoff backoff', async ({ backoff, backoffFn }) => {
    const maxAttempts = 4;
    const duration = 150;

    const retryConfig = new RetryConfig({ maxAttempts, duration, backoff });

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryConfig });

    const expectedChainInfo = await provider.operations.getChain();

    const fetchSpy = jest.spyOn(global, 'fetch');

    const callTimes: number[] = [];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TS is throwing error when test is run, but not in IDE
    fetchSpy.mockImplementation((input: RequestInfo | URL, init: RequestInit | undefined) => {
      // const time = Date.now();

      // if (fetchSpy.mock.calls.length === 1) {
      //   initialCallTime = time;
      // } else {
      //   retryCallTimes.push(time);
      // }

      callTimes.push(Date.now());

      if (fetchSpy.mock.calls.length <= maxAttempts) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore asd
        const error = new Error();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore TS is throwing error when test is run, but not in IDE
        error.cause = {
          code: 'ECONNREFUSED',
        };

        throw error;
      }

      fetchSpy.mockRestore();

      return fetch(input, init);
    });

    const chainInfo = await provider.operations.getChain();

    expect(chainInfo).toEqual(expectedChainInfo);
    expect(callTimes.length - 1).toBe(maxAttempts); // callTimes.length - 1 is for the initial call that's not a retry so we ignore it

    callTimes.forEach((callTime, index) => {
      if (index === 0) return; // initial call doesn't count as it's not a retry

      const waitTime = callTime - callTimes[index - 1];

      const expectedWaitTime = backoffFn(duration, index);

      // in one test run the waitTime was 1ms less than the expectedWaitTime
      // meaning that the call happened before the wait duration expired
      // this might be something related to the event loop and how it schedules setTimeouts
      // expectedWaitTime minus 5ms seems like reasonable to allow
      expect(waitTime).toBeGreaterThanOrEqual(expectedWaitTime - 5);
      expect(waitTime).toBeLessThanOrEqual(expectedWaitTime + 10);
    });
  });

  test('throws if last attempt fails', async () => {
    const maxAttempts = 5;
    const duration = 100;

    const retryConfig = new RetryConfig({ maxAttempts, duration, backoff: 'fixed' });

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryConfig });

    const fetchSpy = jest
      .spyOn(global, 'fetch')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS is throwing error when test is run, but not in IDE
      .mockImplementation(() => {
        const error = new Error();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore TS is throwing error when test is run, but not in IDE
        error.cause = {
          code: 'ECONNREFUSED',
        };

        throw error;
      });

    const { error } = await safeExec(() => provider.operations.getChain());

    expect(error).toMatchObject({ cause: { code: 'ECONNREFUSED' } });
    // the added one is for the initial call which isn't considered a retry attempt
    expect(fetchSpy).toHaveBeenCalledTimes(maxAttempts + 1);
  });
});
