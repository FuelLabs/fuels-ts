import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import type { BN, BigNumberish } from '@fuel-ts/math';
import { bn, toNumber } from '@fuel-ts/math';
import type { Input } from '@fuel-ts/transactions';
import { InputType } from '@fuel-ts/transactions';

export type CoinTransactionRequestInput = {
  type: InputType.Coin;

  /** UTXO ID */
  id: BytesLike;

  /** Owning address or script hash */
  owner: BytesLike;

  /** Amount of coins */
  amount: BigNumberish;

  /** Asset ID of the coins */
  assetId: BytesLike;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: BytesLike;

  /** Index of witness that authorizes spending the coin */
  witnessIndex: number;

  /** UTXO being spent must have been created at least this many blocks ago */
  maturity?: number;

  /** Gas used by predicate */
  predicateGasUsed?: BN;

  /** Predicate bytecode */
  predicate?: BytesLike;

  /** Predicate input data (parameters) */
  predicateData?: BytesLike;
};

export type MessageTransactionRequestInput = {
  type: InputType.Message;

  /** Address of sender */
  sender: BytesLike;

  /** Address of recipient */
  recipient: BytesLike;

  /** Amount of coins */
  amount: BigNumberish;

  /** Index of witness that authorizes the message */
  witnessIndex: number;

  /** Unique nonce of message */
  nonce: BytesLike;

  /** Gas used by predicate */
  predicateGasUsed?: BN;

  /** Predicate bytecode */
  predicate?: BytesLike;

  /** Predicate input data (parameters) */
  predicateData?: BytesLike;

  /** data of message */
  data?: BytesLike;
};

export type ContractTransactionRequestInput = {
  type: InputType.Contract;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: BytesLike;

  /** Contract ID */
  contractId: BytesLike;
};
export type TransactionRequestInput =
  | CoinTransactionRequestInput
  | ContractTransactionRequestInput
  | MessageTransactionRequestInput;

export const inputify = (value: TransactionRequestInput): Input => {
  switch (value.type) {
    case InputType.Coin: {
      const predicate = arrayify(value.predicate ?? '0x');
      const predicateData = arrayify(value.predicateData ?? '0x');
      return {
        type: InputType.Coin,
        utxoID: {
          transactionId: hexlify(arrayify(value.id).slice(0, 32)),
          outputIndex: arrayify(value.id)[32],
        },
        owner: hexlify(value.owner),
        amount: bn(value.amount),
        assetId: hexlify(value.assetId),
        txPointer: {
          blockHeight: toNumber(arrayify(value.txPointer).slice(0, 8)),
          txIndex: toNumber(arrayify(value.txPointer).slice(8, 16)),
        },
        witnessIndex: value.witnessIndex,
        maturity: value.maturity ?? 0,
        predicateGasUsed: value.predicateGasUsed ?? bn(0),
        predicateLength: predicate.length,
        predicateDataLength: predicateData.length,
        predicate: hexlify(predicate),
        predicateData: hexlify(predicateData),
      };
    }
    case InputType.Contract: {
      return {
        type: InputType.Contract,
        utxoID: {
          transactionId: ZeroBytes32,
          outputIndex: 0,
        },
        balanceRoot: ZeroBytes32,
        stateRoot: ZeroBytes32,
        txPointer: {
          blockHeight: toNumber(arrayify(value.txPointer).slice(0, 8)),
          txIndex: toNumber(arrayify(value.txPointer).slice(8, 16)),
        },
        contractID: hexlify(value.contractId),
      };
    }
    case InputType.Message: {
      const predicate = arrayify(value.predicate ?? '0x');
      const predicateData = arrayify(value.predicateData ?? '0x');
      const data = arrayify(value.data ?? '0x');
      return {
        type: InputType.Message,
        sender: hexlify(value.sender),
        recipient: hexlify(value.recipient),
        amount: bn(value.amount),
        nonce: hexlify(value.nonce),
        witnessIndex: value.witnessIndex,
        predicateGasUsed: value.predicateGasUsed ?? bn(0),
        predicateLength: predicate.length,
        predicateDataLength: predicateData.length,
        predicate: hexlify(predicate),
        predicateData: hexlify(predicateData),
        data: hexlify(data),
        dataLength: data.length,
      };
    }
    default: {
      throw new Error('Invalid Input type');
    }
  }
};
