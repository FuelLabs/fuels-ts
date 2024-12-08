import type { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { coders, createCoder } from './coders';

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

export const outputCoinCoder = createCoder('OutputCoin', {
  type: coders.type(OutputType.Coin),
  to: coders.b256,
  amount: coders.u64,
  assetId: coders.b256,
});

export type OutputContract = {
  type: OutputType.Contract;
  /** Index of input contract (u8) */
  inputIndex: number;
  /** Root of amount of coins owned by contract after transaction execution (b256) */
  balanceRoot: string;
  /** State root of contract after transaction execution (b256) */
  stateRoot: string;
};

export const outputContractCoder = createCoder('OutputContract', {
  type: coders.type(OutputType.Contract),
  inputIndex: coders.u8,
  balanceRoot: coders.b256,
  stateRoot: coders.b256,
});

export type OutputChange = {
  type: OutputType.Change;
  /** Receiving address or script hash (b256) */
  to: string;
  /** Amount of coins to send (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export const outputChangeCoder = createCoder('OutputChange', {
  type: coders.type(OutputType.Change),
  to: coders.b256,
  amount: coders.u64,
  assetId: coders.b256,
});

export type OutputVariable = {
  type: OutputType.Variable;
  /** Receiving address or script hash (b256) */
  to: string;
  /** Amount of coins to send (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export const outputVariableCoder = createCoder('OutputVariable', {
  type: coders.type(OutputType.Variable),
  to: coders.b256,
  amount: coders.u64,
  assetId: coders.b256,
});

export type OutputContractCreated = {
  type: OutputType.ContractCreated;
  /** Contract ID (b256) */
  contractId: string;
  /** State root of contract (b256) */
  stateRoot: string;
};

export const outputContractCreatedCoder = createCoder('OutputContractCreated', {
  type: coders.type(OutputType.ContractCreated),
  contractId: coders.b256,
  stateRoot: coders.b256,
});

export type Output =
  | OutputCoin
  | OutputContract
  | OutputChange
  | OutputVariable
  | OutputContractCreated;

export const outputCoder: Coder<Output, Output> = {
  type: 'Output',
  encode: (value: Output): Uint8Array => {
    const parts: Uint8Array[] = [];

    parts.push(coders.u8.encode(value.type));
    const { type } = value;

    switch (type) {
      case OutputType.Coin: {
        parts.push(outputCoinCoder.encode(value));
        break;
      }
      case OutputType.Contract: {
        parts.push(outputContractCoder.encode(value));
        break;
      }
      case OutputType.Change: {
        parts.push(outputChangeCoder.encode(value));
        break;
      }
      case OutputType.Variable: {
        parts.push(outputVariableCoder.encode(value));
        break;
      }
      case OutputType.ContractCreated: {
        parts.push(outputContractCreatedCoder.encode(value));
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
  },
  decode: (data: Uint8Array, initialOffset: number): [Output, number] => {
    let decoded;
    let o = initialOffset;

    [decoded, o] = coders.u8.decode(data, initialOffset);
    const type = decoded as OutputType;

    switch (type) {
      case OutputType.Coin: {
        [decoded, o] = outputCoinCoder.decode(data, o);
        return [decoded, o];
      }
      case OutputType.Contract: {
        [decoded, o] = outputContractCoder.decode(data, o);
        return [decoded, o];
      }
      case OutputType.Change: {
        [decoded, o] = outputChangeCoder.decode(data, o);
        return [decoded, o];
      }
      case OutputType.Variable: {
        [decoded, o] = outputVariableCoder.decode(data, o);
        return [decoded, o];
      }
      case OutputType.ContractCreated: {
        [decoded, o] = outputContractCreatedCoder.decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${type}.`
        );
      }
    }
  },
};
