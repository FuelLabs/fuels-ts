import { BN } from '@fuel-ts/math';

import { coinQuantityfy } from './coin-quantity';

/**
 * @group node
 */
describe('coinQuantityfy', () => {
  it('should return expected values', () => {
    expect(coinQuantityfy([0]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([0.9]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([2]).amount.toNumber()).toEqual(2);
    const maxPlusOne = new BN(Number.MAX_SAFE_INTEGER).add(new BN(1));
    expect(coinQuantityfy([maxPlusOne]).amount.toString()).toEqual(maxPlusOne.toString());
  });
});
