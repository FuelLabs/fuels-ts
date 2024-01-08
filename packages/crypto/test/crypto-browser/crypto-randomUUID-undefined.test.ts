import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { CryptoMock } from './crypto-mock';

/**
 * @group node
 */
describe('throws when crypto.randomUUID is unavailable', () => {
  test('crypto.randomUUID is undefined', async () => {
    vi.stubGlobal('crypto', new CryptoMock('randomUUID'));

    await expectToThrowFuelError(
      () => import('../../src/browser/crypto'),
      new FuelError(
        ErrorCode.ENV_DEPENDENCY_MISSING,
        `Could not find 'crypto.randomUUID' in current browser environment.`
      )
    );
  });
});
