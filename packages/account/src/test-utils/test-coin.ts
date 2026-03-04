import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { bn, type BigNumberish } from '@fuel-ts/math';
import type { SnapshotConfigs } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';

interface TestCoinSpecs {
  owner: Address;
  amount: BigNumberish;
  asset_id: string;
  tx_pointer_block_height: number;
  tx_pointer_tx_idx: number;
  output_index: number;
  tx_id: string;
}

export type ChainCoin = SnapshotConfigs['stateConfig']['coins'][0];

export class TestCoin {
  public readonly owner: Address;
  public readonly amount: BigNumberish;
  public readonly asset_id: string;
  public readonly tx_pointer_block_height: number;
  public readonly tx_pointer_tx_idx: number;
  public readonly output_index: number;
  public readonly tx_id: string;

  /**
   * A helper class to create coins for testing purposes.
   *
   * Used in tandem with `WalletsConfig`.
   * It can also be used standalone and passed into the initial state of a chain via the `.toChainCoin` method.
   */
  constructor({
    owner = Address.fromRandom(),
    amount = 1_000_000,
    asset_id = '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
    tx_pointer_block_height = 0,
    tx_pointer_tx_idx = 0,
    output_index = 0,
    tx_id = hexlify(randomBytes(32)),
  }: Partial<TestCoinSpecs> = {}) {
    this.owner = owner;
    this.amount = amount;
    this.asset_id = asset_id;
    this.tx_pointer_block_height = tx_pointer_block_height;
    this.tx_pointer_tx_idx = tx_pointer_tx_idx;
    this.output_index = output_index;
    this.tx_id = tx_id;
  }

  /**
   * Creates multiple test coins with the same base configuration.
   */
  static many(specs: Partial<TestCoinSpecs> = {}, count: number = 1): TestCoin[] {
    return Array.from({ length: count }, () => new TestCoin(specs));
  }

  toChainCoin(owner?: Address): ChainCoin {
    return {
      owner: owner?.toHexString() ?? this.owner.toHexString(),
      amount: bn(this.amount).toString(),
      asset_id: this.asset_id,
      tx_pointer_block_height: this.tx_pointer_block_height,
      tx_pointer_tx_idx: this.tx_pointer_tx_idx,
      output_index: this.output_index,
      tx_id: this.tx_id,
    };
  }
}
