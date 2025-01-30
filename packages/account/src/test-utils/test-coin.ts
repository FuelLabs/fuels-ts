import { Coin } from '@fuel-ts/account';
import { bn } from '@fuel-ts/math';
import { getRandomB256 } from '@fuel-ts/crypto';

export class TestCoin {
  /**
   * Creates a single test coin with given parameters
   */
  static create(params: Partial<Coin> = {}): Coin {
    return {
      id: params.id || getRandomB256(),
      owner: params.owner || getRandomB256(),
      amount: params.amount || bn(1000000),
      type: params.type || 0,
      ...params
    };
  }

  /**
   * Generates an array of test coins with the same base parameters
   */
  static many(params: Partial<Coin> = {}, count = 1): Coin[] {
    return Array.from({ length: count }, () => TestCoin.create(params));
  }
}
