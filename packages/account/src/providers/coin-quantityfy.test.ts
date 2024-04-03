import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { BN } from '@fuel-ts/math';

import { coinQuantityfy } from './coin-quantity';

/**
 * @group node
 */
describe('coinQuantityfy', () => {
  const baseAssetId = ZeroBytes32;

  it('amount that is less than 1 is rounded up to 1', () => {
    expect(coinQuantityfy([Number.MIN_VALUE, baseAssetId]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([0, baseAssetId]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([1 - Number.EPSILON, baseAssetId]).amount.toNumber()).toEqual(1);
  });
  test('amount of return value is set properly', () => {
    expect(coinQuantityfy([2, baseAssetId]).amount.toNumber()).toEqual(2);
    const maxPlusOne = new BN(Number.MAX_SAFE_INTEGER).add(new BN(1));
    expect(coinQuantityfy([maxPlusOne, baseAssetId]).amount.toString()).toEqual(
      maxPlusOne.toString()
    );
  });
});
