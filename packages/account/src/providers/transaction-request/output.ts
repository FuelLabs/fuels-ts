import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BigNumberish } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Output } from '@fuel-ts/transactions';
import { OutputType } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';

export type CoinTransactionRequestOutput = {
  type: OutputType.Coin;
  /** Receiving address or script hash */
  to: BytesLike;
  /** Amount of coins to send */
  amount: BigNumberish;
  /** Asset ID of coins */
  assetId: BytesLike;
};
export type ContractTransactionRequestOutput = {
  type: OutputType.Contract;
  /** Index of input contract */
  inputIndex: number;
};
export type ChangeTransactionRequestOutput = {
  type: OutputType.Change;
  /** Receiving address or script hash */
  to: BytesLike;
  /** Asset ID of coins */
  assetId: BytesLike;
};
export type VariableTransactionRequestOutput = {
  type: OutputType.Variable;
};
export type ContractCreatedTransactionRequestOutput = {
  type: OutputType.ContractCreated;
  /** Contract ID */
  contractId: BytesLike;
  /** State Root */
  stateRoot: BytesLike;
};
export type TransactionRequestOutput =
  | CoinTransactionRequestOutput
  | ContractTransactionRequestOutput
  | ChangeTransactionRequestOutput
  | VariableTransactionRequestOutput
  | ContractCreatedTransactionRequestOutput;

/** @hidden */
export const outputify = (value: TransactionRequestOutput): Output => {
  const { type } = value;

  switch (type) {
    case OutputType.Coin: {
      return {
        type: OutputType.Coin,
        to: hexlify(value.to),
        amount: bn(value.amount),
        assetId: hexlify(value.assetId),
      };
    }
    case OutputType.Contract: {
      return {
        type: OutputType.Contract,
        inputIndex: value.inputIndex,
        balanceRoot: ZeroBytes32,
        stateRoot: ZeroBytes32,
      };
    }
    case OutputType.Change: {
      return {
        type: OutputType.Change,
        to: hexlify(value.to),
        amount: bn(0),
        assetId: hexlify(value.assetId),
      };
    }
    case OutputType.Variable: {
      return {
        type: OutputType.Variable,
        to: ZeroBytes32,
        amount: bn(0),
        assetId: ZeroBytes32,
      };
    }
    case OutputType.ContractCreated: {
      return {
        type: OutputType.ContractCreated,
        contractId: hexlify(value.contractId),
        stateRoot: hexlify(value.stateRoot),
      };
    }
    default: {
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${type}.`
      );
    }
  }
};
