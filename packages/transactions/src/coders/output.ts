/* eslint-disable max-classes-per-file */
import { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { coders } from './coders';

export enum OutputType /* u8 */ {
  Coin = 0,
  Contract = 1,
  Change = 2,
  Variable = 3,
  ContractCreated = 4,
}

export type OutputCoin = {
  type: OutputType.Coin;
  /** Receiving address or script hash (b256) */
  to: string;
  /** Amount of coins to send (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export class OutputCoinCoder extends Coder<OutputCoin, OutputCoin> {
  private coder = coders.struct({
    type: coders.type(OutputType.Coin),
    to: coders.b256,
    amount: coders.u64,
    assetId: coders.b256,
  });

  override type = 'OutputCoin';

  encode(value: OutputCoin): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [OutputCoin, number] {
    return this.coder.decode(data, offset);
  }
}

export type OutputContract = {
  type: OutputType.Contract;
  /** Index of input contract (u8) */
  inputIndex: number;
  /** Root of amount of coins owned by contract after transaction execution (b256) */
  balanceRoot: string;
  /** State root of contract after transaction execution (b256) */
  stateRoot: string;
};

export class OutputContractCoder extends Coder<OutputContract, OutputContract> {
  private coder = coders.struct({
    type: coders.type(OutputType.Contract),
    inputIndex: coders.u8,
    balanceRoot: coders.b256,
    stateRoot: coders.b256,
  });

  override type = 'OutputCoin';

  encode(value: OutputContract): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [OutputContract, number] {
    return this.coder.decode(data, offset);
  }
}

export type OutputChange = {
  type: OutputType.Change;
  /** Receiving address or script hash (b256) */
  to: string;
  /** Amount of coins to send (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export class OutputChangeCoder extends Coder<OutputChange, OutputChange> {
  private coder = coders.struct({
    type: coders.type(OutputType.Change),
    to: coders.b256,
    amount: coders.u64,
    assetId: coders.b256,
  });

  override type = 'OutputChange';

  encode(value: OutputChange): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [OutputChange, number] {
    return this.coder.decode(data, offset);
  }
}

export type OutputVariable = {
  type: OutputType.Variable;
  /** Receiving address or script hash (b256) */
  to: string;
  /** Amount of coins to send (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export class OutputVariableCoder extends Coder<OutputVariable, OutputVariable> {
  private coder = coders.struct({
    type: coders.type(OutputType.Variable),
    to: coders.b256,
    amount: coders.u64,
    assetId: coders.b256,
  });

  override type = 'OutputVariable';

  encode(value: OutputVariable): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [OutputVariable, number] {
    return this.coder.decode(data, offset);
  }
}

export type OutputContractCreated = {
  type: OutputType.ContractCreated;
  /** Contract ID (b256) */
  contractId: string;
  /** State root of contract (b256) */
  stateRoot: string;
};

export class OutputContractCreatedCoder extends Coder<
  OutputContractCreated,
  OutputContractCreated
> {
  private coder = coders.struct({
    type: coders.type(OutputType.ContractCreated),
    contractId: coders.b256,
    stateRoot: coders.b256,
  });

  override type = 'OutputContractCreated';

  encode(value: OutputContractCreated): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [OutputContractCreated, number] {
    return this.coder.decode(data, offset);
  }
}

export type Output =
  | OutputCoin
  | OutputContract
  | OutputChange
  | OutputVariable
  | OutputContractCreated;

export class OutputCoder extends Coder<Output, Output> {
  override type = 'Output';

  encode(value: Output): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u8.encode(value.type));
    const { type } = value;

    switch (type) {
      case OutputType.Coin: {
        parts.push(new OutputCoinCoder().encode(value));
        break;
      }
      case OutputType.Contract: {
        parts.push(new OutputContractCoder().encode(value));
        break;
      }
      case OutputType.Change: {
        parts.push(new OutputChangeCoder().encode(value));
        break;
      }
      case OutputType.Variable: {
        parts.push(new OutputVariableCoder().encode(value));
        break;
      }
      case OutputType.ContractCreated: {
        parts.push(new OutputContractCreatedCoder().encode(value));
        break;
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${type}.`
        );
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, initialOffset: number): [Output, number] {
    let decoded;
    let o = initialOffset;

    [decoded, o] = coders.u8.decode(data, initialOffset);
    const type = decoded as OutputType;

    switch (type) {
      case OutputType.Coin: {
        [decoded, o] = new OutputCoinCoder().decode(data, o);
        return [decoded, o];
      }
      case OutputType.Contract: {
        [decoded, o] = new OutputContractCoder().decode(data, o);
        return [decoded, o];
      }
      case OutputType.Change: {
        [decoded, o] = new OutputChangeCoder().decode(data, o);
        return [decoded, o];
      }
      case OutputType.Variable: {
        [decoded, o] = new OutputVariableCoder().decode(data, o);
        return [decoded, o];
      }
      case OutputType.ContractCreated: {
        [decoded, o] = new OutputContractCreatedCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${type}.`
        );
      }
    }
  }
}
