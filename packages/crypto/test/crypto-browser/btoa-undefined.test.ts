import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { CryptoMock } from './crypto-mock';

/**
 * @group node
 */
describe('throws when btoa is unavailable', () => {
  test('btoa is undefined', async () => {
    if (!globalThis.crypto) {
      // this is for node v18 where globalThis.crypto is undefined
      // these are tests for the browser environment anyways so doing this is okay
      vi.stubGlobal('crypto', new CryptoMock());
    }
    vi.stubGlobal('btoa', undefined);

    await expectToThrowFuelError(
      () => import('../../src/browser/crypto'),
      new FuelError(
        ErrorCode.ENV_DEPENDENCY_MISSING,
        `Could not find 'btoa' in current browser environment.`
      )
    );
  });
});
