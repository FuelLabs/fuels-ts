import { BN } from '@fuel-ts/math';

import { coinQuantityfy } from './coin-quantity';

/**
 * @group node
 */
describe('coinQuantityfy', () => {
  it('amount that is less than 1 is rounded up to 1', () => {
    expect(coinQuantityfy([Number.MIN_SAFE_INTEGER]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([0]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([1 - Number.EPSILON]).amount.toNumber()).toEqual(1);
  });
  test('amount of return is set properly', () => {
    expect(coinQuantityfy([2]).amount.toNumber()).toEqual(2);
    const maxPlusOne = new BN(Number.MAX_SAFE_INTEGER).add(new BN(1));
    expect(coinQuantityfy([maxPlusOne]).amount.toString()).toEqual(maxPlusOne.toString());
  });
});
