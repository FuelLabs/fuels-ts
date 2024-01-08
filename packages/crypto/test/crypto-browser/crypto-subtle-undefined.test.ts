import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { CryptoMock } from './crypto-mock';

/**
 * @group crypto
 */
describe('throws when crypto.subtle is unavailable', () => {
  test('crypto.subtle is undefined', async () => {
    vi.stubGlobal('crypto', new CryptoMock('subtle'));

    await expectToThrowFuelError(
      () => import('../../src/browser/crypto'),
      new FuelError(
        ErrorCode.ENV_DEPENDENCY_MISSING,
        `Could not find 'crypto.subtle' in current browser environment.`
      )
    );
  });
});
