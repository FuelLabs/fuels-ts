import { safeExec } from '@fuel-ts/errors/test-utils';

import type { RetryOptions } from '../src/call-retrier';
import Provider from '../src/provider';

// TODO: Figure out a way to import this constant from `@fuel-ts/wallet/configs`
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

function mockFetch(maxAttempts: number, callTimes: number[]) {
  const fetchSpy = vi.spyOn(global, 'fetch');

  fetchSpy.mockImplementation((...args: unknown[]) => {
    callTimes.push(Date.now());

    if (fetchSpy.mock.calls.length <= maxAttempts) {
      const error = new Error();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore TS is not happy with this property, but it works. ts-expect-error doesn't work for some reason, so I chose ts-ignore
      error.cause = {
        code: 'ECONNREFUSED',
      };

      throw error;
    }

    fetchSpy.mockRestore();

    return fetch(args[0] as URL, args[1] as RequestInit);
  });
}

/**
 * @group node
 */
describe('Retries correctly', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const maxRetries = 4;
  const baseDuration = 150;

  function assertBackoff(callTime: number, index: number, arr: number[], expectedWaitTime: number) {
    if (index === 0) {
      return;
    } // initial call doesn't count as it's not a retry

    const waitTime = callTime - arr[index - 1];

    // in one test run the waitTime was 1ms less than the expectedWaitTime
    // meaning that the call happened before the wait duration expired
    // this might be something related to the event loop and how it schedules setTimeouts
    // expectedWaitTime minus 5ms seems like reasonable to allow
    expect(waitTime).toBeGreaterThanOrEqual(expectedWaitTime - 5);
    expect(waitTime).toBeLessThanOrEqual(expectedWaitTime + 15);
  }

  test('fixed backoff', async () => {
    const retryOptions: RetryOptions = { maxRetries, baseDuration, backoff: 'fixed' };

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryOptions });

    const callTimes: number[] = [];

    mockFetch(maxRetries, callTimes);

    const expectedChainInfo = await provider.operations.getChain();

    const chainInfo = await provider.operations.getChain();

    expect(chainInfo.chain.name).toEqual(expectedChainInfo.chain.name);
    expect(callTimes.length - 1).toBe(maxRetries); // callTimes.length - 1 is for the initial call that's not a retry so we ignore it

    callTimes.forEach((callTime, index) => assertBackoff(callTime, index, callTimes, baseDuration));
  });

  test('linear backoff', async () => {
    const retryOptions = {
      maxRetries,
      backoff: 'linear' as const,
    };

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryOptions });
    const callTimes: number[] = [];

    mockFetch(maxRetries, callTimes);

    const expectedChainInfo = await provider.operations.getChain();

    const chainInfo = await provider.operations.getChain();

    expect(chainInfo.chain.name).toEqual(expectedChainInfo.chain.name);
    expect(callTimes.length - 1).toBe(maxRetries); // callTimes.length - 1 is for the initial call that's not a retry so we ignore it

    callTimes.forEach((callTime, index) =>
      assertBackoff(callTime, index, callTimes, baseDuration * index)
    );
  });

  test('exponential backoff', async () => {
    // #region provider-retry-options
    const retryOptions: RetryOptions = {
      maxRetries,
      baseDuration,
      backoff: 'exponential',
    };

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryOptions });
    // #endregion provider-retry-options

    const callTimes: number[] = [];

    mockFetch(maxRetries, callTimes);

    const expectedChainInfo = await provider.operations.getChain();

    const chainInfo = await provider.operations.getChain();

    expect(chainInfo.chain.name).toEqual(expectedChainInfo.chain.name);
    expect(callTimes.length - 1).toBe(maxRetries); // callTimes.length - 1 is for the initial call that's not a retry so we ignore it

    callTimes.forEach((callTime, index) =>
      assertBackoff(callTime, index, callTimes, baseDuration * (2 ^ (index - 1)))
    );
  });

  test('throws if last attempt fails', async () => {
    const retryOptions = {
      maxRetries,
      backoff: 'fixed' as const,
    };

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryOptions });

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation(() => {
      const error = new Error() as Error & { cause: { code: string } };
      error.cause = {
        code: 'ECONNREFUSED',
      };

      throw error;
    });

    const { error } = await safeExec(() => provider.operations.getChain());

    expect(error).toMatchObject({ cause: { code: 'ECONNREFUSED' } });
    // the added one is for the initial call which isn't considered a retry attempt
    expect(fetchSpy).toHaveBeenCalledTimes(maxRetries + 1);
  });
});
