import { FUEL_NETWORK_URL } from '../src/configs';
import Provider from '../src/providers/provider';
import * as autoRetryFetchMod from '../src/providers/utils/auto-retry-fetch';
import type { RetryOptions } from '../src/providers/utils/auto-retry-fetch';

/**
 * @group node
 * TODO: add browser group as well (https://github.com/FuelLabs/fuels-ts/pull/1654#discussion_r1456501593)
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
