import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { CryptoMock } from './crypto-mock';

/**
 * @group crypto
 */
describe('throws when crypto.getRandomValues is unavailable', () => {
  test('crypto.getRandomValues is undefined', async () => {
    vi.stubGlobal('crypto', new CryptoMock('getRandomValues'));

    await expectToThrowFuelError(
      () => import('../../src/browser/crypto'),
      new FuelError(
        ErrorCode.ENV_DEPENDENCY_MISSING,
        `Could not find 'crypto.getRandomValues' in current browser environment.`
      )
    );
  });
});
