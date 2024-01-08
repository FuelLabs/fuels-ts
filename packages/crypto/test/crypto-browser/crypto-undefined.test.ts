import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

/**
 * @group node
 */
describe('throws when crypto is unavailable', () => {
  test('crypto is undefined', async () => {
    vi.stubGlobal('crypto', undefined);

    await expectToThrowFuelError(
      () => import('../../src/browser/crypto'),
      new FuelError(
        ErrorCode.ENV_DEPENDENCY_MISSING,
        `Could not find 'crypto' in current browser environment.`
      )
    );
  });
});
