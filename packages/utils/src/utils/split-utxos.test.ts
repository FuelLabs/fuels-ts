import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { BN } from '@fuel-ts/math';

import { splitUTXOs } from './split-utxos';

/**
 * @group node
 * @group browser
 */
describe('splitUTXOs', () => {
  it('should generate two UTXOs by default', () => {
    // using unknown as AbstractAddress to avoid importing @fuel-ts/address as that's a circular dependency
    const destination = '0x...' as unknown as AbstractAddress;

    expect(splitUTXOs(new BN(100), new BN(10), '0x0', destination)).toEqual([
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
    ]);
  });

  it('should throw an error if the balance is zero', async () => {
    const destination = '0x...' as unknown as AbstractAddress;

    await expectToThrowFuelError(
      () => splitUTXOs(new BN(0), new BN(10), '0x0', destination),
      new FuelError(ErrorCode.INVALID_DATA, 'Balance must be greater than zero')
    );
  });

  it('should generate an exact number of UTXOs if specified', () => {
    const destination = '0x...' as unknown as AbstractAddress;

    expect(splitUTXOs(new BN(100), new BN(10), '0x0', destination, 3)).toEqual([
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
    ]);
  });

  it('should generate the maximum number of UTXOs possible', () => {
    const destination = '0x...' as unknown as AbstractAddress;

    expect(splitUTXOs(new BN(40), new BN(10), '0x0', destination, 5)).toEqual([
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
      { amount: new BN(10), assetId: '0x0', destination },
    ]);
  });
});
