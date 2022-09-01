/* eslint-disable max-classes-per-file */
import { concat } from '@ethersproject/bytes';
import { Coder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import U64Coder from '@fuel-ts/abi-coder/src/coders/u64';
import type { BN } from '@fuel-ts/math';

export enum OutputType /* u8 */ {
  Coin = 0,
  Contract = 1,
  Withdrawal = 2,
  Change = 3,
  Variable = 4,
  ContractCreated = 5,
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
  constructor() {
    super('OutputCoin', 'struct OutputCoin', 0);
  }

  encode(value: OutputCoin): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputCoin, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;

    return [
      {
        type: OutputType.Coin,
        to,
        amount,
        assetId,
      },
      o,
    ];
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
  constructor() {
    super('OutputContract', 'struct OutputContract', 0);
  }

  encode(value: OutputContract): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.inputIndex));
    parts.push(new B256Coder().encode(value.balanceRoot));
    parts.push(new B256Coder().encode(value.stateRoot));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputContract, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const inputIndex = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const balanceRoot = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const stateRoot = decoded;

    return [
      {
        type: OutputType.Contract,
        inputIndex,
        balanceRoot,
        stateRoot,
      },
      o,
    ];
  }
}

export type OutputWithdrawal = {
  type: OutputType.Withdrawal;
  /** Receiving address (b256) */
  to: string;
  /** Amount of coins to withdraw (u64) */
  amount: BN;
  /** Asset ID of coins (b256) */
  assetId: string;
};

export class OutputWithdrawalCoder extends Coder<OutputWithdrawal, OutputWithdrawal> {
  constructor() {
    super('OutputWithdrawal', 'struct OutputWithdrawal', 0);
  }

  encode(value: OutputWithdrawal): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputWithdrawal, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;

    return [
      {
        type: OutputType.Withdrawal,
        to,
        amount,
        assetId,
      },
      o,
    ];
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
  constructor() {
    super('OutputChange', 'struct OutputChange', 0);
  }

  encode(value: OutputChange): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputChange, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;

    return [
      {
        type: OutputType.Change,
        to,
        amount,
        assetId,
      },
      o,
    ];
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
  constructor() {
    super('OutputVariable', 'struct OutputVariable', 0);
  }

  encode(value: OutputVariable): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputVariable, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;

    return [
      {
        type: OutputType.Variable,
        to,
        amount,
        assetId,
      },
      o,
    ];
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
  constructor() {
    super('OutputContractCreated', 'struct OutputContractCreated', 0);
  }

  encode(value: OutputContractCreated): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.contractId));
    parts.push(new B256Coder().encode(value.stateRoot));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [OutputContractCreated, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const stateRoot = decoded;

    return [
      {
        type: OutputType.ContractCreated,
        contractId,
        stateRoot,
      },
      o,
    ];
  }
}

export type Output =
  | OutputCoin
  | OutputContract
  | OutputWithdrawal
  | OutputChange
  | OutputVariable
  | OutputContractCreated;

export class OutputCoder extends Coder<Output, Output> {
  constructor() {
    super('Output', ' struct Output', 0);
  }

  encode(value: Output): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.type));
    switch (value.type) {
      case OutputType.Coin: {
        parts.push(new OutputCoinCoder().encode(value));
        break;
      }
      case OutputType.Contract: {
        parts.push(new OutputContractCoder().encode(value));
        break;
      }
      case OutputType.Withdrawal: {
        parts.push(new OutputWithdrawalCoder().encode(value));
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
        throw new Error('Invalid Output type');
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Output, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8').decode(data, o);
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
      case OutputType.Withdrawal: {
        [decoded, o] = new OutputWithdrawalCoder().decode(data, o);
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
        throw new Error('Invalid Output type');
      }
    }
  }
}
