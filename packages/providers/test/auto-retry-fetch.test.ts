import Provider from '../src/provider';
import type { RetryOptions } from '../src/utils/auto-retry-fetch';
import * as autoRetryFetchMod from '../src/utils/auto-retry-fetch';

// TODO: Figure out a way to import this constant from `@fuel-ts/wallet/configs`
const FUEL_NETWORK_URL = 'http://127.0.0.1:4000/graphql';

/**
 * @group node
 */
describe('Provider correctly', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Provider should always wrap `fetchFn`', async () => {
    const autoRetryFetchFn = vi.spyOn(autoRetryFetchMod, 'autoRetryFetch');

    // #region provider-retry-options
    const retryOptions: RetryOptions = {
      maxRetries: 5,
      baseDelay: 100,
      backoff: 'exponential',
    };

    const provider = await Provider.create(FUEL_NETWORK_URL, { retryOptions });
    // #endregion provider-retry-options

    expect(provider).toBeTruthy();
    expect(autoRetryFetchFn).toHaveBeenCalledTimes(1);
  });
});
