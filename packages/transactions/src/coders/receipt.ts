/* eslint-disable max-classes-per-file */

import { arrayify, concat } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { Coder, U64Coder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';

import { ByteArrayCoder } from './byte-array';

export enum ReceiptType /* u8 */ {
  Call = 0,
  Return = 1,
  ReturnData = 2,
  Panic = 3,
  Revert = 4,
  Log = 5,
  LogData = 6,
  Transfer = 7,
  TransferOut = 8,
  ScriptResult = 9,
  MessageOut = 10,
  Mint = 11,
  Burn = 12,
}

export type ReceiptCall = {
  type: ReceiptType.Call;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  from: string;
  /** Contract ID of called contract (b256) */
  to: string;
  /** Amount of coins to forward, i.e. $rB (u64) */
  amount: BN;
  /** Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) */
  assetId: string;
  /** Gas to forward, i.e. $rD (u64) */
  gas: BN;
  /** First parameter (u64) */
  param1: BN;
  /** Second parameter (u64) */
  param2: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptCallCoder extends Coder<ReceiptCall, ReceiptCall> {
  constructor() {
    super('ReceiptCall', 'struct ReceiptCall', 0);
  }

  encode(value: ReceiptCall): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new U64Coder().encode(value.gas));
    parts.push(new U64Coder().encode(value.param1));
    parts.push(new U64Coder().encode(value.param2));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptCall, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const gas = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const param1 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const param2 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Call,
        from,
        to,
        amount,
        assetId,
        gas,
        param1,
        param2,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptReturn = {
  type: ReceiptType.Return;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Value of register $rA (u64) */
  val: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptReturnCoder extends Coder<ReceiptReturn, ReceiptReturn> {
  constructor() {
    super('ReceiptReturn', 'struct ReceiptReturn', 0);
  }

  encode(value: ReceiptReturn): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.val));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturn, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Return,
        id,
        val,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptReturnData = {
  type: ReceiptType.ReturnData;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Value of register $rA (u64) */
  ptr: BN;
  /** Value of register $rB (u64) */
  len: BN;
  /** Hash of MEM[$rA, $rB] (b256) */
  digest: string;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptReturnDataCoder extends Coder<ReceiptReturnData, ReceiptReturnData> {
  constructor() {
    super('ReceiptReturnData', 'struct ReceiptReturnData', 0);
  }

  encode(value: ReceiptReturnData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.ptr));
    parts.push(new U64Coder().encode(value.len));
    parts.push(new B256Coder().encode(value.digest));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturnData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const ptr = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const digest = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.ReturnData,
        id,
        ptr,
        len,
        digest,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptPanic = {
  type: ReceiptType.Panic;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Panic reason (u64) */
  reason: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
  /** Value of optional contract ID */
  contractId: string;
};

export class ReceiptPanicCoder extends Coder<ReceiptPanic, ReceiptPanic> {
  constructor() {
    super('ReceiptPanic', 'struct ReceiptPanic', 0);
  }

  encode(value: ReceiptPanic): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.reason));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));
    parts.push(new B256Coder().encode(value.contractId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptPanic, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const reason = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;

    return [
      {
        type: ReceiptType.Panic,
        id,
        reason,
        pc,
        is,
        contractId,
      },
      o,
    ];
  }
}

export type ReceiptRevert = {
  type: ReceiptType.Revert;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Value of register $rA (u64) */
  val: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptRevertCoder extends Coder<ReceiptRevert, ReceiptRevert> {
  constructor() {
    super('ReceiptRevert', 'struct ReceiptRevert', 0);
  }

  encode(value: ReceiptRevert): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.val));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptRevert, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Revert,
        id,
        val,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptLog = {
  type: ReceiptType.Log;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Value of register $rA (u64) */
  val0: BN;
  /** Value of register $rB (u64) */
  val1: BN;
  /** Value of register $rC (u64) */
  val2: BN;
  /** Value of register $rD (u64) */
  val3: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptLogCoder extends Coder<ReceiptLog, ReceiptLog> {
  constructor() {
    super('ReceiptLog', 'struct ReceiptLog', 0);
  }

  encode(value: ReceiptLog): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.val0));
    parts.push(new U64Coder().encode(value.val1));
    parts.push(new U64Coder().encode(value.val2));
    parts.push(new U64Coder().encode(value.val3));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLog, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val0 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val1 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val2 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val3 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Log,
        id,
        val0,
        val1,
        val2,
        val3,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptLogData = {
  type: ReceiptType.LogData;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
  /** Value of register $rA (u64) */
  val0: BN;
  /** Value of register $rB (u64) */
  val1: BN;
  /** Value of register $rC (u64) */
  ptr: BN;
  /** Value of register $rD (u64) */
  len: BN;
  /** Hash of MEM[$rC, $rD] (b256) */
  digest: string;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptLogDataCoder extends Coder<ReceiptLogData, ReceiptLogData> {
  constructor() {
    super('ReceiptLogData', 'struct ReceiptLogData', 0);
  }

  encode(value: ReceiptLogData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new U64Coder().encode(value.val0));
    parts.push(new U64Coder().encode(value.val1));
    parts.push(new U64Coder().encode(value.ptr));
    parts.push(new U64Coder().encode(value.len));
    parts.push(new B256Coder().encode(value.digest));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLogData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val0 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val1 = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const ptr = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const digest = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.LogData,
        id,
        val0,
        val1,
        ptr,
        len,
        digest,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptTransfer = {
  type: ReceiptType.Transfer;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  from: string;
  /** Contract ID of contract to transfer coins to (b256) */
  to: string;
  /** Amount of coins transferred (u64) */
  amount: BN;
  /** Asset ID of coins transferred (b256) */
  assetId: string;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptTransferCoder extends Coder<ReceiptTransfer, ReceiptTransfer> {
  constructor() {
    super('ReceiptTransfer', 'struct ReceiptTransfer', 0);
  }

  encode(value: ReceiptTransfer): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransfer, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Transfer,
        from,
        to,
        amount,
        assetId,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptTransferOut = {
  type: ReceiptType.TransferOut;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  from: string;
  /** Address to transfer coins to (b256) */
  to: string;
  /** Amount of coins transferred (u64) */
  amount: BN;
  /** Asset ID of coins transferred (b256) */
  assetId: string;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptTransferOutCoder extends Coder<ReceiptTransferOut, ReceiptTransferOut> {
  constructor() {
    super('ReceiptTransferOut', 'struct ReceiptTransferOut', 0);
  }

  encode(value: ReceiptTransferOut): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransferOut, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.TransferOut,
        from,
        to,
        amount,
        assetId,
        pc,
        is,
      },
      o,
    ];
  }
}

export type ReceiptScriptResult = {
  type: ReceiptType.ScriptResult;
  /** Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) */
  result: BN;
  /** Gas consumed by the script (u64) */
  gasUsed: BN;
};

export class ReceiptScriptResultCoder extends Coder<ReceiptScriptResult, ReceiptScriptResult> {
  constructor() {
    super('ReceiptScriptResult', 'struct ReceiptScriptResult', 0);
  }

  encode(value: ReceiptScriptResult): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new U64Coder().encode(value.result));
    parts.push(new U64Coder().encode(value.gasUsed));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptScriptResult, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new U64Coder().decode(data, o);
    const result = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const gasUsed = decoded;

    return [
      {
        type: ReceiptType.ScriptResult,
        result,
        gasUsed,
      },
      o,
    ];
  }
}

export type ReceiptMessageOut = {
  type: ReceiptType.MessageOut;
  /** Hexadecimal string representation of the 256-bit (32-byte) message ID */
  messageId: string;
  /** Hexadecimal string representation of the 256-bit (32-byte) address of the message sender: MEM[$fp, 32] */
  sender: string;
  /** Hexadecimal string representation of the 256-bit (32-byte) address of the message recipient: MEM[$rA, 32] */
  recipient: string;
  /** Hexadecimal string representation of a 64-bit unsigned integer; value of register $rD */
  amount: BN;
  /** Hexadecimal string representation of the 256-bit (32-byte) message nonce */
  nonce: string;
  /** Hexadecimal string representation of 256-bit (32-byte), hash of MEM[$rA + 32, $rB] */
  digest: string;
  /** Hexadecimal string representation of the value of the memory range MEM[$rA + 32, $rB] */
  data: Uint8Array;
};

export class ReceiptMessageOutCoder extends Coder<ReceiptMessageOut, ReceiptMessageOut> {
  constructor() {
    super('ReceiptMessageOut', 'struct ReceiptMessageOut', 0);
  }

  static getMessageId(
    value: Pick<ReceiptMessageOut, 'sender' | 'recipient' | 'nonce' | 'amount' | 'data'>
  ): string {
    const parts: Uint8Array[] = [];

    parts.push(new ByteArrayCoder(32).encode(value.sender));
    parts.push(new ByteArrayCoder(32).encode(value.recipient));
    parts.push(new ByteArrayCoder(32).encode(value.nonce));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(arrayify(value.data || '0x'));

    return sha256(concat(parts));
  }

  encode(value: Omit<ReceiptMessageOut, 'messageId'>): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.sender));
    parts.push(new B256Coder().encode(value.recipient));
    parts.push(new U64Coder().encode(value.amount));
    parts.push(new B256Coder().encode(value.nonce));
    parts.push(new NumberCoder('u16').encode(value.data.length));
    parts.push(new B256Coder().encode(value.digest));
    parts.push(new ByteArrayCoder(value.data.length).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptMessageOut, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const sender = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const recipient = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const nonce = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const digest = decoded;
    [decoded, o] = new ByteArrayCoder(len).decode(data, o);
    const messageData = arrayify(decoded);

    const receiptMessageOut: ReceiptMessageOut = {
      type: ReceiptType.MessageOut,
      messageId: '',
      sender,
      recipient,
      amount,
      nonce,
      digest,
      data: messageData,
    };
    receiptMessageOut.messageId = ReceiptMessageOutCoder.getMessageId(receiptMessageOut);

    return [receiptMessageOut, o];
  }
}

export type ReceiptMint = {
  type: ReceiptType.Mint;

  subId: string;

  contractId: string;

  assetId: string;

  val: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

const getAssetIdForMintAndBurnReceipts = (contractId: string, subId: string): string => {
  const contractIdBytes = arrayify(contractId);
  const subIdBytes = arrayify(subId);

  return sha256(concat([contractIdBytes, subIdBytes]));
};

export class ReceiptMintCoder extends Coder<ReceiptMint, ReceiptMint> {
  constructor() {
    super('ReceiptMint', 'struct ReceiptMint', 0);
  }

  static getAssetId(contractId: string, subId: string): string {
    return getAssetIdForMintAndBurnReceipts(contractId, subId);
  }

  encode(value: ReceiptMint): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.subId));
    parts.push(new B256Coder().encode(value.contractId));
    parts.push(new U64Coder().encode(value.val));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptMint, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const subId = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    const assetId = ReceiptMintCoder.getAssetId(contractId, subId);

    const receiptMint: ReceiptMint = {
      type: ReceiptType.Mint,
      subId,
      contractId,
      val,
      pc,
      is,
      assetId,
    };

    return [receiptMint, o];
  }
}

export type ReceiptBurn = {
  type: ReceiptType.Burn;

  subId: string;

  contractId: string;

  assetId: string;

  val: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

export class ReceiptBurnCoder extends Coder<ReceiptBurn, ReceiptBurn> {
  constructor() {
    super('ReceiptBurn', 'struct ReceiptBurn', 0);
  }

  static getAssetId(contractId: string, subId: string): string {
    return getAssetIdForMintAndBurnReceipts(contractId, subId);
  }

  encode(value: ReceiptBurn): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.subId));
    parts.push(new B256Coder().encode(value.contractId));
    parts.push(new U64Coder().encode(value.val));
    parts.push(new U64Coder().encode(value.pc));
    parts.push(new U64Coder().encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptBurn, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const subId = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const val = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const pc = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const is = decoded;

    const assetId = ReceiptMintCoder.getAssetId(contractId, subId);

    const receiptBurn: ReceiptBurn = {
      type: ReceiptType.Burn,
      subId,
      contractId,
      val,
      pc,
      is,
      assetId,
    };

    return [receiptBurn, o];
  }
}

export type Receipt =
  | ReceiptCall
  | ReceiptReturn
  | ReceiptReturnData
  | ReceiptPanic
  | ReceiptRevert
  | ReceiptLog
  | ReceiptLogData
  | ReceiptTransfer
  | ReceiptTransferOut
  | ReceiptScriptResult
  | ReceiptMessageOut
  | ReceiptMint
  | ReceiptBurn;

export class ReceiptCoder extends Coder<Receipt, Receipt> {
  constructor() {
    super('Receipt', 'struct Receipt', 0);
  }

  encode(value: Receipt): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.type));
    switch (value.type) {
      case ReceiptType.Call: {
        parts.push(new ReceiptCallCoder().encode(value));
        break;
      }
      case ReceiptType.Return: {
        parts.push(new ReceiptReturnCoder().encode(value));
        break;
      }
      case ReceiptType.ReturnData: {
        parts.push(new ReceiptReturnDataCoder().encode(value));
        break;
      }
      case ReceiptType.Panic: {
        parts.push(new ReceiptPanicCoder().encode(value));
        break;
      }
      case ReceiptType.Revert: {
        parts.push(new ReceiptRevertCoder().encode(value));
        break;
      }
      case ReceiptType.Log: {
        parts.push(new ReceiptLogCoder().encode(value));
        break;
      }
      case ReceiptType.LogData: {
        parts.push(new ReceiptLogDataCoder().encode(value));
        break;
      }
      case ReceiptType.Transfer: {
        parts.push(new ReceiptTransferCoder().encode(value));
        break;
      }
      case ReceiptType.TransferOut: {
        parts.push(new ReceiptTransferOutCoder().encode(value));
        break;
      }
      case ReceiptType.ScriptResult: {
        parts.push(new ReceiptScriptResultCoder().encode(value));
        break;
      }
      case ReceiptType.MessageOut: {
        parts.push(new ReceiptMessageOutCoder().encode(value));
        break;
      }
      case ReceiptType.Mint: {
        parts.push(new ReceiptMintCoder().encode(value));
        break;
      }
      case ReceiptType.Burn: {
        parts.push(new ReceiptBurnCoder().encode(value));
        break;
      }
      default: {
        throw new Error('Invalid Receipt type');
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Receipt, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const type = decoded as ReceiptType;
    switch (type) {
      case ReceiptType.Call: {
        [decoded, o] = new ReceiptCallCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Return: {
        [decoded, o] = new ReceiptReturnCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.ReturnData: {
        [decoded, o] = new ReceiptReturnDataCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Panic: {
        [decoded, o] = new ReceiptPanicCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Revert: {
        [decoded, o] = new ReceiptRevertCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Log: {
        [decoded, o] = new ReceiptLogCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.LogData: {
        [decoded, o] = new ReceiptLogDataCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Transfer: {
        [decoded, o] = new ReceiptTransferCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.TransferOut: {
        [decoded, o] = new ReceiptTransferOutCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.ScriptResult: {
        [decoded, o] = new ReceiptScriptResultCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.MessageOut: {
        [decoded, o] = new ReceiptMessageOutCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Mint: {
        [decoded, o] = new ReceiptMintCoder().decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Burn: {
        [decoded, o] = new ReceiptBurnCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new Error('Invalid Receipt type');
      }
    }
  }
}
