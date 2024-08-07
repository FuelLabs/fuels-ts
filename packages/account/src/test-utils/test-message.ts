import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { bn, type BN } from '@fuel-ts/math';
import type { SnapshotConfigs } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';

interface TestMessageSpecs {
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: string;
  amount: number;
  data: string;
  da_height: number;
}

export type ChainMessage = SnapshotConfigs['stateConfig']['messages'][0];

export class TestMessage {
  public readonly sender: AbstractAddress;
  public readonly recipient: AbstractAddress;
  public readonly nonce: string;
  public readonly amount: number | BN;
  public readonly data: string;
  public readonly da_height: number;

  /**
   * A helper class to create messages for testing purposes.
   *
   * Used in tandem with `WalletsConfig`.
   * It can also be used standalone and passed into the initial state of a chain via the `.toChainMessage` method.
   */
  constructor({
    sender = Address.fromRandom(),
    recipient = Address.fromRandom(),
    nonce = hexlify(randomBytes(32)),
    amount = 1_000_000,
    data = '', // Will default to empty data in order to be a spendable message
    da_height = 0,
  }: Partial<TestMessageSpecs> = {}) {
    this.sender = sender;
    this.recipient = recipient;
    this.nonce = nonce;
    this.amount = amount;
    this.data = data;
    this.da_height = da_height;
  }

  toChainMessage(recipient?: AbstractAddress): ChainMessage {
    // Fuel-core throwns error for message data prefixed with 0x within the stateConfig.json file
    const data = /^0x/.test(this.data) ? this.data.replace(/^0x/, '') : this.data;
    return {
      sender: this.sender.toB256(),
      recipient: recipient?.toB256() ?? this.recipient.toB256(),
      nonce: this.nonce,
      amount: bn(this.amount).toNumber(),
      data,
      da_height: this.da_height,
    };
  }
}
