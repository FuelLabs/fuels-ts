import { Coin } from '@fuel-ts/account';
import { bn, type BN } from '@fuel-ts/math';
import { getRandomB256 } from '@fuel-ts/address';

interface TestCoinSpecs {
  id: string;
  owner: string;
  amount: BN;
  assetId: string;
}

export class TestCoin {
  public readonly id: string;
  public readonly owner: string;
  public readonly amount: BN;
  public readonly assetId: string;

  /**
   * A helper class to create coins for testing purposes.
   */
  constructor({
    id = getRandomB256(),
    owner = getRandomB256(),
    amount = bn(1000000),
    assetId = getRandomB256(),
  }: Partial<TestCoinSpecs> = {}) {
    this.id = id;
    this.owner = owner;
    this.amount = amount;
    this.assetId = assetId;
  }

  /**
   * Creates a chain-compatible coin object
   */
  toCoin(): Coin {
    return {
      id: this.id,
      owner: this.owner,
      amount: this.amount,
      assetId: this.assetId,
    };
  }

  /**
   * Creates multiple test coins with the same base parameters
   */
  static many(params: Partial<TestCoinSpecs> = {}, count = 1): Coin[] {
    return Array.from({ length: count }, () => new TestCoin(params).toCoin());
  }
}
