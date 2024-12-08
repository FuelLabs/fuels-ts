/* eslint-disable max-classes-per-file */
import { Coder, BYTES_32 } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { sha256 } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { concat, arrayify } from '@fuel-ts/utils';

import { byteArray } from './byte-array';
import { coders, createCoder } from './coders';
import type { TxPointer } from './tx-pointer';
import { txPointerCoder } from './tx-pointer';

export enum InputType {
  Coin = 0,
  Contract = 1,
  Message = 2,
}

export type InputCoin = {
  type: InputType.Coin;

  /** Hash of transaction (b256) */
  txID: string;

  /** Index of transaction output (u16) */
  outputIndex: number;

  /** Owning address or script hash (b256) */
  owner: string;

  /** Amount of coins (u64) */
  amount: BN;

  /** Asset ID of the coins (b256) */
  assetId: string;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: TxPointer;

  /** Index of witness that authorizes spending the coin (u16) */
  witnessIndex: number;

  /** Gas used by predicate (u64) */
  predicateGasUsed: BN;

  /** Length of predicate, in instructions (u64) */
  predicateLength: BN;

  /** Length of predicate input data, in bytes (u64) */
  predicateDataLength: BN;

  /** Predicate bytecode (byte[]) */
  predicate: string;

  /** Predicate input data (parameters) (byte[]) */
  predicateData: string;
};

export const inputCoinCoder = () => {
  const primary = coders.struct({
    txID: coders.b256,
    outputIndex: coders.u16,
    owner: coders.b256,
    amount: coders.u64,
    assetId: coders.b256,
    txPointer: txPointerCoder,
    witnessIndex: coders.u16,
    predicateGasUsed: coders.u64,
    predicateLength: coders.u64,
    predicateDataLength: coders.u64,
  });

  const secondary = (value: Pick<InputCoin, 'predicateLength' | 'predicateDataLength'>) =>
    coders.struct({
      predicate: byteArray(value.predicateLength.toNumber()),
      predicateData: byteArray(value.predicateDataLength.toNumber()),
    });

  return {
    type: 'InputCoin',
    encode: (value: InputCoin): Uint8Array => {
      const parts: Uint8Array[] = [];
      parts.push(primary.encode(value));
      parts.push(secondary(value).encode(value));
      return concat(parts);
    },
    decode: (data: Uint8Array, offset: number): [InputCoin, number] => {
      let decoded;
      let o = offset;
      [decoded, o] = primary.decode(data, o);
      const base = decoded;
      [decoded, o] = secondary(base).decode(data, o);
      const rest = decoded;
      const inputCoin: InputCoin = {
        type: InputType.Coin,
        ...base,
        ...rest,
      };
      return [inputCoin, o];
    },
  };
};

export type InputContract = {
  type: InputType.Contract;

  /** Hash of transaction (b256) */
  txID: string;

  /** Index of transaction output (u16) */
  outputIndex: number;

  /** Root of amount of coins owned by contract before transaction execution (b256) */
  balanceRoot: string;

  /** State root of contract before transaction execution (b256) */
  stateRoot: string;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: TxPointer;

  /** Contract ID (b256) */
  contractID: string;
};

export const inputContractCoder = createCoder('InputContract', {
  type: coders.type(InputType.Contract),
  txID: coders.b256,
  outputIndex: coders.u16,
  balanceRoot: coders.b256,
  stateRoot: coders.b256,
  txPointer: txPointerCoder,
  contractID: coders.b256,
});

export type InputMessage = {
  type: InputType.Message;

  /** Address of sender */
  sender: string;

  /** Address of recipient */
  recipient: string;

  /** Amount of coins */
  amount: BN;

  /** Unique nonce of message */
  nonce: string;

  /** Index of witness that authorizes message (u16) */
  witnessIndex: number;

  /** Gas used by predicate (u64) */
  predicateGasUsed: BN;

  /** Length of data (u64) */
  dataLength?: number;

  /** Length of predicate, in instructions (u64) */
  predicateLength: BN;

  /** Length of predicate input data, in bytes (u64) */
  predicateDataLength: BN;

  /** data of message */
  data?: string;

  /** Predicate bytecode (byte[]) */
  predicate: string;

  /** Predicate input data (parameters) (byte[]) */
  predicateData: string;
};

export class InputMessageCoder extends Coder<InputMessage, InputMessage> {
  override type = 'InputMessage';

  static getMessageId(
    value: Pick<InputMessage, 'sender' | 'recipient' | 'nonce' | 'amount' | 'data'>
  ): string {
    const parts: Uint8Array[] = [];

    parts.push(byteArray(BYTES_32).encode(value.sender));
    parts.push(byteArray(BYTES_32).encode(value.recipient));
    parts.push(byteArray(BYTES_32).encode(value.nonce));
    parts.push(coders.u64.encode(value.amount));
    parts.push(arrayify(value.data || '0x'));

    return sha256(concat(parts));
  }

  static encodeData(messageData?: BytesLike): Uint8Array {
    const bytes = arrayify(messageData || '0x');
    const dataLength = bytes.length;
    return byteArray(dataLength).encode(bytes);
  }

  override encode(value: InputMessage): Uint8Array {
    const parts: Uint8Array[] = [];
    const data = InputMessageCoder.encodeData(value.data);

    parts.push(byteArray(BYTES_32).encode(value.sender));
    parts.push(byteArray(BYTES_32).encode(value.recipient));
    parts.push(coders.u64.encode(value.amount));
    parts.push(byteArray(BYTES_32).encode(value.nonce));
    parts.push(coders.u16.encode(value.witnessIndex));
    parts.push(coders.u64.encode(value.predicateGasUsed));
    parts.push(coders.u64.encode(data.length));
    parts.push(coders.u64.encode(value.predicateLength));
    parts.push(coders.u64.encode(value.predicateDataLength));
    parts.push(byteArray(data.length).encode(data));
    parts.push(byteArray(value.predicateLength.toNumber()).encode(value.predicate));
    parts.push(byteArray(value.predicateDataLength.toNumber()).encode(value.predicateData));

    return concat(parts);
  }

  static decodeData(messageData: BytesLike): Uint8Array {
    const bytes = arrayify(messageData);
    const dataLength = bytes.length;
    const [data] = byteArray(dataLength).decode(bytes, 0);

    return arrayify(data);
  }

  override decode(data: Uint8Array, offset: number): [InputMessage, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.b256.decode(data, o);
    const sender = decoded;
    [decoded, o] = coders.b256.decode(data, o);
    const recipient = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const amount = decoded;
    [decoded, o] = coders.b256.decode(data, o);
    const nonce = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessIndex = Number(decoded);
    [decoded, o] = coders.u64.decode(data, o);
    const predicateGasUsed = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const dataLength = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const predicateLength = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const predicateDataLength = decoded;
    [decoded, o] = byteArray(dataLength).decode(data, o);
    const messageData = decoded;
    [decoded, o] = byteArray(predicateLength.toNumber()).decode(data, o);
    const predicate = decoded;
    [decoded, o] = byteArray(predicateDataLength.toNumber()).decode(data, o);
    const predicateData = decoded;

    return [
      {
        type: InputType.Message,
        sender,
        recipient,
        amount,
        witnessIndex,
        nonce,
        predicateGasUsed,
        dataLength,
        predicateLength,
        predicateDataLength,
        data: messageData,
        predicate,
        predicateData,
      },
      o,
    ];
  }
}

export type Input = InputCoin | InputContract | InputMessage;

export class InputCoder extends Coder<Input, Input> {
  override type = 'Input';

  override encode(value: Input): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u8.encode(value.type));

    const { type } = value;

    switch (type) {
      case InputType.Coin: {
        parts.push(inputCoinCoder().encode(value));
        break;
      }
      case InputType.Contract: {
        parts.push(inputContractCoder.encode(value));
        break;
      }
      case InputType.Message: {
        parts.push(new InputMessageCoder().encode(value));
        break;
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${type}.`
        );
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Input, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.u8.decode(data, o);
    const type = decoded as InputType;
    switch (type) {
      case InputType.Coin: {
        [decoded, o] = inputCoinCoder().decode(data, o);
        return [decoded, o];
      }
      case InputType.Contract: {
        [decoded, o] = inputContractCoder.decode(data, o);
        return [decoded, o];
      }
      case InputType.Message: {
        [decoded, o] = new InputMessageCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${type}.`
        );
      }
    }
  }
}
