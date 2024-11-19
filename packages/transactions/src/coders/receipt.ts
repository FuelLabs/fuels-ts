/* eslint-disable max-classes-per-file */
import { Coder, BigNumberCoder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { sha256 } from '@fuel-ts/hasher';
import type { AssetId } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { arrayify, concat } from '@fuel-ts/utils';

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
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `id` instead.
   */
  from: string;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptCallCoder extends Coder<ReceiptCall, ReceiptCall> {
  constructor() {
    super('ReceiptCall', 'struct ReceiptCall', 0);
  }

  encode(value: ReceiptCall): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new BigNumberCoder('u64').encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new BigNumberCoder('u64').encode(value.gas));
    parts.push(new BigNumberCoder('u64').encode(value.param1));
    parts.push(new BigNumberCoder('u64').encode(value.param2));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptCall, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const gas = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const param1 = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const param2 = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Call,
        id,
        from: id,
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptReturnCoder extends Coder<ReceiptReturn, ReceiptReturn> {
  constructor() {
    super('ReceiptReturn', 'struct ReceiptReturn', 0);
  }

  encode(value: ReceiptReturn): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.val));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturn, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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
  /** Value of the memory range MEM[$rA, $rB]. */
  data: string;
  /** Value of register $is (u64) */
  is: BN;
};

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptReturnDataCoder extends Coder<ReceiptReturnData, ReceiptReturnData> {
  constructor() {
    super('ReceiptReturnData', 'struct ReceiptReturnData', 0);
  }

  encode(value: ReceiptReturnData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.ptr));
    parts.push(new BigNumberCoder('u64').encode(value.len));
    parts.push(new B256Coder().encode(value.digest));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));
    parts.push(new ByteArrayCoder(value.len.toNumber()).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturnData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const ptr = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const digest = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;
    [decoded, o] = new ByteArrayCoder(len.toNumber()).decode(data, o);
    const returnData = decoded;

    return [
      {
        type: ReceiptType.ReturnData,
        id,
        ptr,
        len,
        digest,
        pc,
        is,
        data: returnData,
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptPanicCoder extends Coder<ReceiptPanic, ReceiptPanic> {
  constructor() {
    super('ReceiptPanic', 'struct ReceiptPanic', 0);
  }

  encode(value: ReceiptPanic): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.reason));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));
    parts.push(new B256Coder().encode(value.contractId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptPanic, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const reason = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptRevertCoder extends Coder<ReceiptRevert, ReceiptRevert> {
  constructor() {
    super('ReceiptRevert', 'struct ReceiptRevert', 0);
  }

  encode(value: ReceiptRevert): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.val));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptRevert, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `ra` instead.
   */
  val0: BN;
  /** Value of register $rA (u64) */
  ra: BN;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `rb` instead.
   */
  val1: BN;
  /** Value of register $rB (u64) */
  rb: BN;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `rc` instead.
   */
  val2: BN;
  /** Value of register $rC (u64) */
  rc: BN;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `rd` instead.
   */
  val3: BN;
  /** Value of register $rD (u64) */
  rd: BN;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptLogCoder extends Coder<ReceiptLog, ReceiptLog> {
  constructor() {
    super('ReceiptLog', 'struct ReceiptLog', 0);
  }

  encode(value: ReceiptLog): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.val0));
    parts.push(new BigNumberCoder('u64').encode(value.val1));
    parts.push(new BigNumberCoder('u64').encode(value.val2));
    parts.push(new BigNumberCoder('u64').encode(value.val3));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLog, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const ra = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const rb = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const rc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const rd = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Log,
        id,
        ra,
        rb,
        rc,
        rd,
        val0: ra,
        val1: rb,
        val2: rc,
        val3: rd,
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
  ra: BN;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `ra` instead.
   */
  val0: BN;
  /** Value of register $rB (u64) */
  rb: BN;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `rb` instead.
   */
  val1: BN;
  /** Value of register $rC (u64) */
  ptr: BN;
  /** Value of register $rD (u64) */
  len: BN;
  /** Hash of MEM[$rC, $rD] (b256) */
  digest: string;
  /** Value of the memory range MEM[$rC, $rD]. */
  data: string;
  /** Value of register $pc (u64) */
  pc: BN;
  /** Value of register $is (u64) */
  is: BN;
};

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptLogDataCoder extends Coder<ReceiptLogData, ReceiptLogData> {
  constructor() {
    super('ReceiptLogData', 'struct ReceiptLogData', 0);
  }

  encode(value: ReceiptLogData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.id));
    parts.push(new BigNumberCoder('u64').encode(value.val0));
    parts.push(new BigNumberCoder('u64').encode(value.val1));
    parts.push(new BigNumberCoder('u64').encode(value.ptr));
    parts.push(new BigNumberCoder('u64').encode(value.len));
    parts.push(new B256Coder().encode(value.digest));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));
    parts.push(new ByteArrayCoder(value.len.toNumber()).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLogData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const ra = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const rb = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const ptr = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const digest = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;
    [decoded, o] = new ByteArrayCoder(len.toNumber()).decode(data, o);
    const logData = decoded;

    return [
      {
        type: ReceiptType.LogData,
        id,
        ra,
        rb,
        val0: ra,
        val1: rb,
        ptr,
        len,
        digest,
        pc,
        is,
        data: logData,
      },
      o,
    ];
  }
}

export type ReceiptTransfer = {
  type: ReceiptType.Transfer;
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `id` instead.
   */
  from: string;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptTransferCoder extends Coder<ReceiptTransfer, ReceiptTransfer> {
  constructor() {
    super('ReceiptTransfer', 'struct ReceiptTransfer', 0);
  }

  encode(value: ReceiptTransfer): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new BigNumberCoder('u64').encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransfer, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Transfer,
        id,
        from: id,
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
  /**
   * @deprecated This property is deprecated and it will be removed soon. Use property `id` instead.
   */
  from: string;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  id: string;
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptTransferOutCoder extends Coder<ReceiptTransferOut, ReceiptTransferOut> {
  constructor() {
    super('ReceiptTransferOut', 'struct ReceiptTransferOut', 0);
  }

  encode(value: ReceiptTransferOut): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.from));
    parts.push(new B256Coder().encode(value.to));
    parts.push(new BigNumberCoder('u64').encode(value.amount));
    parts.push(new B256Coder().encode(value.assetId));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransferOut, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const id = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const to = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const assetId = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.TransferOut,
        id,
        from: id,
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptScriptResultCoder extends Coder<ReceiptScriptResult, ReceiptScriptResult> {
  constructor() {
    super('ReceiptScriptResult', 'struct ReceiptScriptResult', 0);
  }

  encode(value: ReceiptScriptResult): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new BigNumberCoder('u64').encode(value.result));
    parts.push(new BigNumberCoder('u64').encode(value.gasUsed));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptScriptResult, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const result = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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
  /** Decimal string representation of a 16-bit unsigned integer; value of register $rC. */
  len: number;
  /** Hexadecimal string representation of 256-bit (32-byte), hash of MEM[$rA + 32, $rB] */
  digest: string;
  /** Hexadecimal string representation of the value of the memory range MEM[$rA + 32, $rB] */
  data: Uint8Array;
};

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptMessageOutCoder extends Coder<ReceiptMessageOut, ReceiptMessageOut> {
  constructor() {
    super('ReceiptMessageOut', 'struct ReceiptMessageOut', 0);
  }

  /**
   * @deprecated `ReceiptMessageOutCoder.getMessageId` is deprecated and will be removed in future versions.
   * Use the static method `InputMessageCoder.getMessageId` instead.
   */
  static getMessageId(
    value: Pick<ReceiptMessageOut, 'sender' | 'recipient' | 'nonce' | 'amount' | 'data'>
  ): string {
    const parts: Uint8Array[] = [];

    parts.push(new ByteArrayCoder(32).encode(value.sender));
    parts.push(new ByteArrayCoder(32).encode(value.recipient));
    parts.push(new ByteArrayCoder(32).encode(value.nonce));
    parts.push(new BigNumberCoder('u64').encode(value.amount));
    parts.push(arrayify(value.data || '0x'));

    return sha256(concat(parts));
  }

  encode(value: Omit<ReceiptMessageOut, 'messageId'>): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.sender));
    parts.push(new B256Coder().encode(value.recipient));
    parts.push(new BigNumberCoder('u64').encode(value.amount));
    parts.push(new B256Coder().encode(value.nonce));
    parts.push(new NumberCoder('u16', { padToWordSize: true }).encode(value.data.length));
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
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const nonce = decoded;
    [decoded, o] = new NumberCoder('u16', { padToWordSize: true }).decode(data, o);
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
      len,
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

export const getMintedAssetId = (contractId: string, subId: string): string => {
  const contractIdBytes = arrayify(contractId);
  const subIdBytes = arrayify(subId);

  return sha256(concat([contractIdBytes, subIdBytes]));
};

export const createAssetId = (contractId: string, subId: string): AssetId => ({
  bits: getMintedAssetId(contractId, subId),
});

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptMintCoder extends Coder<ReceiptMint, ReceiptMint> {
  constructor() {
    super('ReceiptMint', 'struct ReceiptMint', 0);
  }

  /**
   * @deprecated `ReceiptMintCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(contractId: string, subId: string): string {
    return getMintedAssetId(contractId, subId);
  }

  encode(value: ReceiptMint): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.subId));
    parts.push(new B256Coder().encode(value.contractId));
    parts.push(new BigNumberCoder('u64').encode(value.val));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptMint, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const subId = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptBurnCoder extends Coder<ReceiptBurn, ReceiptBurn> {
  constructor() {
    super('ReceiptBurn', 'struct ReceiptBurn', 0);
  }

  /**
   * @deprecated `ReceiptBurnCoder.getAssetId` is deprecated and will be removed in future versions.
   * Use the helper function `getMintedAssetId` instead.
   */
  static getAssetId(contractId: string, subId: string): string {
    return getMintedAssetId(contractId, subId);
  }

  encode(value: ReceiptBurn): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder().encode(value.subId));
    parts.push(new B256Coder().encode(value.contractId));
    parts.push(new BigNumberCoder('u64').encode(value.val));
    parts.push(new BigNumberCoder('u64').encode(value.pc));
    parts.push(new BigNumberCoder('u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptBurn, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder().decode(data, o);
    const subId = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const contractId = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
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

/**
 * @deprecated Receipt Coders are deprecated and will be removed in future versions
 * because decoding receipts is no longer necessary. No replacement is required as
 * this functionality is obsolete.
 */
export class ReceiptCoder extends Coder<Receipt, Receipt> {
  constructor() {
    super('Receipt', 'struct Receipt', 0);
  }

  encode(value: Receipt): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8', { padToWordSize: true }).encode(value.type));

    const { type } = value;

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
        throw new FuelError(ErrorCode.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${type}`);
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Receipt, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8', { padToWordSize: true }).decode(data, o);
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
        throw new FuelError(ErrorCode.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${type}`);
      }
    }
  }
}
