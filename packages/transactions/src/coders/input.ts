/* eslint-disable max-classes-per-file */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { Coder, U64Coder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';

import { ByteArrayCoder } from './byte-array';
import type { TxPointer } from './tx-pointer';
import { TxPointerCoder } from './tx-pointer';
import type { UtxoId } from './utxo-id';
import { UtxoIdCoder } from './utxo-id';

export enum InputType {
  Coin = 0,
  Contract = 1,
  Message = 2,
}

export type InputCoin = {
  type: InputType.Coin;

  /** UTXO ID (UtxoId) */
  utxoID: UtxoId;

  /** Owning address or script hash (b256) */
  owner: string;

  /** Amount of coins (u64) */
  amount: BN;

  /** Asset ID of the coins (b256) */
  assetId: string;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: TxPointer;

  /** Index of witness that authorizes spending the coin (u8) */
  witnessIndex: number;

  /** UTXO being spent must have been created at least this many blocks ago (u32) */
  maturity: number;

  /** Length of predicate, in instructions (u16) */
  predicateLength: number;

  /** Length of predicate input data, in bytes (u16) */
  predicateDataLength: number;

  /** Predicate bytecode (byte[]) */
  predicate: string;

  /** Predicate input data (parameters) (byte[]) */
  predicateData: string;
};

export class InputCoinCoder extends Coder<InputCoin, InputCoin> {
  constructor() {
    super('InputCoin', 'struct InputCoin', 0);
  }

  encode(value: InputCoin): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new UtxoIdCoder().encode(value.utxoID));
    parts.push(new B256Coder().encode(value.owner));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new TxPointerCoder().encode(value.txPointer));
    parts.push(new NumberCoder('u8').encode(value.witnessIndex));
    parts.push(new NumberCoder('u32').encode(value.maturity));
    parts.push(new NumberCoder('u16').encode(value.predicateLength));
    parts.push(new NumberCoder('u16').encode(value.predicateDataLength));
    parts.push(new ByteArrayCoder(value.predicateLength).encode(value.predicate));
    parts.push(new ByteArrayCoder(value.predicateDataLength).encode(value.predicateData));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [InputCoin, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new UtxoIdCoder().decode(data, o);
    const utxoID = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const owner = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new TxPointerCoder().decode(data, o);
    const txPointer = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const witnessIndex = Number(decoded);
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const predicateLength = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const predicateDataLength = decoded;
    [decoded, o] = new ByteArrayCoder(predicateLength).decode(data, o);
    const predicate = decoded;
    [decoded, o] = new ByteArrayCoder(predicateDataLength).decode(data, o);
    const predicateData = decoded;

    return [
      {
        type: InputType.Coin,
        utxoID,
        owner,
        amount,
        assetId,
        txPointer,
        witnessIndex,
        maturity,
        predicateLength,
        predicateDataLength,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        predicate,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        predicateData,
      },
      o,
    ];
  }
}

export type InputContract = {
  type: InputType.Contract;

  /** UTXO ID (UtxoId) */
  utxoID: UtxoId;

  /** Root of amount of coins owned by contract before transaction execution (b256) */
  balanceRoot: string;

  /** State root of contract before transaction execution (b256) */
  stateRoot: string;

  /** Points to the TX whose output is being spent. (TxPointer) */
  txPointer: TxPointer;

  /** Contract ID (b256) */
  contractID: string;
};

export class InputContractCoder extends Coder<InputContract, InputContract> {
  constructor() {
    super('InputContract', 'struct InputContract', 0);
  }

  encode(value: InputContract): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new UtxoIdCoder().encode(value.utxoID));
    parts.push(new B256Coder().encode(value.balanceRoot));
    parts.push(new B256Coder().encode(value.stateRoot));
    parts.push(new TxPointerCoder().encode(value.txPointer));
    parts.push(new B256Coder().encode(value.contractID));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [InputContract, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new UtxoIdCoder().decode(data, o);
    const utxoID = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const balanceRoot = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const stateRoot = decoded;
    [decoded, o] = new TxPointerCoder().decode(data, o);
    const txPointer = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractID = decoded;

    return [
      {
        type: InputType.Contract,
        utxoID,
        balanceRoot,
        stateRoot,
        txPointer,
        contractID,
      },
      o,
    ];
  }
}

export type InputMessage = {
  type: InputType.Message;

  /** Amount of coins */
  amount: BN;

  /** Address of sender */
  sender: string;

  /** Address of sender */
  recipient: string;

  /** data of message */
  data: string;

  /** Unique nonce of message */
  nonce: BN;

  /** Index of witness that authorizes message (u8) */
  witnessIndex: number;

  /** Length of predicate, in instructions (u16) */
  dataLength: number;

  /** Length of predicate, in instructions (u16) */
  predicateLength: number;

  /** Length of predicate input data, in bytes (u16) */
  predicateDataLength: number;

  /** Predicate bytecode (byte[]) */
  predicate: string;

  /** Predicate input data (parameters) (byte[]) */
  predicateData: string;
};

export class InputMessageCoder extends Coder<InputMessage, InputMessage> {
  constructor() {
    super('InputMessage', 'struct InputMessage', 0);
  }

  static getMessageId(value: InputMessage): string {
    const parts: Uint8Array[] = [];

    parts.push(new ByteArrayCoder(32).encode(value.sender));
    parts.push(new ByteArrayCoder(32).encode(value.recipient));
    parts.push(new U64Coder().encode(value.nonce));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new ByteArrayCoder(value.dataLength).encode(value.data));
    return sha256(concat(parts));
  }

  encode(value: InputMessage): Uint8Array {
    const parts: Uint8Array[] = [];
    const encodedData = new ByteArrayCoder(value.dataLength).encode(value.data);
    const mId = InputMessageCoder.getMessageId(value);
    parts.push(new ByteArrayCoder(32).encode(mId));
    parts.push(new ByteArrayCoder(32).encode(value.sender));
    parts.push(new ByteArrayCoder(32).encode(value.recipient));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new U64Coder().encode(value.nonce));
    parts.push(new NumberCoder('u8').encode(value.witnessIndex));
    parts.push(new NumberCoder('u16').encode(encodedData.length));
    parts.push(new NumberCoder('u16').encode(value.predicateLength));
    parts.push(new NumberCoder('u16').encode(value.predicateDataLength));
    parts.push(encodedData);
    parts.push(new ByteArrayCoder(value.predicateLength).encode(value.predicate));
    parts.push(new ByteArrayCoder(value.predicateDataLength).encode(value.predicateData));

    return concat(parts);
  }

  static decodeData(messageData: BytesLike): Uint8Array {
    const bytes = arrayify(messageData);
    const dataLength = bytes.length;
    const [data] = new ByteArrayCoder(dataLength).decode(bytes, 0);

    return arrayify(data);
  }

  decode(data: Uint8Array, offset: number): [InputMessage, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const sender = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const recipient = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const nonce = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const witnessIndex = Number(decoded);
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const dataLength = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const predicateLength = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const predicateDataLength = decoded;
    [decoded, o] = new ByteArrayCoder(dataLength).decode(data, o);
    const messageData = decoded;
    [decoded, o] = new ByteArrayCoder(predicateLength).decode(data, o);
    const predicate = decoded;
    [decoded, o] = new ByteArrayCoder(predicateDataLength).decode(data, o);
    const predicateData = decoded;

    return [
      {
        type: InputType.Message,
        sender,
        recipient,
        amount,
        witnessIndex,
        nonce,
        data: messageData,
        dataLength,
        predicateLength,
        predicateDataLength,
        predicate,
        predicateData,
      },
      o,
    ];
  }
}

export type Input = InputCoin | InputContract | InputMessage;

export class InputCoder extends Coder<Input, Input> {
  constructor() {
    super('Input', 'struct Input', 0);
  }

  encode(value: Input): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.type));
    switch (value.type) {
      case InputType.Coin: {
        parts.push(new InputCoinCoder().encode(value));
        break;
      }
      case InputType.Contract: {
        parts.push(new InputContractCoder().encode(value));
        break;
      }
      case InputType.Message: {
        parts.push(new InputMessageCoder().encode(value));
        break;
      }
      default: {
        throw new Error('Invalid Input type');
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Input, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const type = decoded as InputType;
    switch (type) {
      case InputType.Coin: {
        [decoded, o] = new InputCoinCoder().decode(data, o);
        return [decoded, o];
      }
      case InputType.Contract: {
        [decoded, o] = new InputContractCoder().decode(data, o);
        return [decoded, o];
      }
      case InputType.Message: {
        [decoded, o] = new InputMessageCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new Error('Invalid Input type');
      }
    }
  }
}
