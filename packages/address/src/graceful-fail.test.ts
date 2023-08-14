import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { Bech32Address } from '@fuel-ts/interfaces';

import * as utils from './utils';

const ADDRESS_B256 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';

test('toB256 (b256 to b256) (graceful fail)', async () => {
  const address = ADDRESS_B256 as Bech32Address;
  const expectedError = new FuelError(
    FuelError.CODES.INVALID_BECH32_ADDRESS,
    `Message that fails: ${address}`
  );
  await expectToThrowFuelError(() => utils.toB256(address), expectedError);
});
