import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

/**
 * @group crypto
 */
describe('throws when btoa is unavailable', () => {
  test('btoa is undefined', async () => {
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
