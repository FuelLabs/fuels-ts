import { BN } from '@fuel-ts/math';

import { coinQuantityfy } from './coin-quantity';

/**
 * @group node
 */
describe('coinQuantityfy', () => {
  it('should returns 1 when input is < 1', () => {
    expect(coinQuantityfy([0]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([0.9]).amount.toNumber()).toEqual(1);
    expect(coinQuantityfy([2]).amount.toNumber()).toEqual(2);
    expect(coinQuantityfy([new BN(Number.MAX_SAFE_INTEGER + 1)]).amount.toNumber()).toEqual(2);
  });
});
