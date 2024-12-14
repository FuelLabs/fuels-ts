import { Coin } from '../types';
import { randomBytes } from 'crypto';

export class TestCoin {
  /**
   * Creates a single test coin with given parameters
   */
  static create(params: Partial<Coin> = {}): Coin {
    return {
      id: params.id || `0x${randomBytes(32).toString('hex')}`,
      owner: params.owner || `0x${randomBytes(32).toString('hex')}`,
      amount: params.amount || BigInt(1000000),
      type: params.type || 0,
      ...params
    };
  }

  /**
   * Generates an array of test coins with the same base parameters
   */
  static many(params: Partial<Coin> = {}, count: number = 1): Coin[] {
    return Array.from({ length: count }, () => TestCoin.create(params));
  }
}
