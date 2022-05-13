/* eslint-disable max-classes-per-file */

import { concat } from '@ethersproject/bytes';
import { Coder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';

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
}

export type ReceiptCall = {
  type: ReceiptType.Call;
  /** Contract ID of current context if in an internal context, zero otherwise (b256) */
  from: string;
  /** Contract ID of called contract (b256) */
  to: string;
  /** Amount of coins to forward, i.e. $rB (u64) */
  amount: bigint;
  /** Asset ID of coins to forward, i.e. MEM[$rC, 32] (b256) */
  assetId: string;
  /** Gas to forward, i.e. $rD (u64) */
  gas: bigint;
  /** First parameter (u64) */
  param1: bigint;
  /** Second parameter (u64) */
  param2: bigint;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptCallCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptCall', 'ReceiptCall', localName);
  }

  encode(value: ReceiptCall): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('from', 'address').encode(value.from));
    parts.push(new B256Coder('to', 'address').encode(value.to));
    parts.push(new NumberCoder('amount', 'u64').encode(value.amount));
    parts.push(new B256Coder('assetId', 'b256').encode(value.assetId));
    parts.push(new NumberCoder('gas', 'u64').encode(value.gas));
    parts.push(new NumberCoder('param1', 'u64').encode(value.param1));
    parts.push(new NumberCoder('param2', 'u64').encode(value.param2));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptCall, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('from', 'address').decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder('to', 'address').decode(data, o);
    const to = decoded;
    [decoded, o] = new NumberCoder('amount', 'u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder('assetId', 'b256').decode(data, o);
    const assetId = decoded;
    [decoded, o] = new NumberCoder('gas', 'u64').decode(data, o);
    const gas = decoded;
    [decoded, o] = new NumberCoder('param1', 'u64').decode(data, o);
    const param1 = decoded;
    [decoded, o] = new NumberCoder('param2', 'u64').decode(data, o);
    const param2 = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  val: bigint;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptReturnCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptReturn', 'ReceiptReturn', localName);
  }

  encode(value: ReceiptReturn): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('val', 'u64').encode(value.val));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturn, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('val', 'u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  ptr: bigint;
  /** Value of register $rB (u64) */
  len: bigint;
  /** Hash of MEM[$rA, $rB] (b256) */
  digest: string;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptReturnDataCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptReturnData', 'ReceiptReturnData', localName);
  }

  encode(value: ReceiptReturnData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('ptr', 'u64').encode(value.ptr));
    parts.push(new NumberCoder('len', 'u64').encode(value.len));
    parts.push(new B256Coder('digest', 'b256').encode(value.digest));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptReturnData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('ptr', 'u64').decode(data, o);
    const ptr = decoded;
    [decoded, o] = new NumberCoder('len', 'u64').decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder('digest', 'b256').decode(data, o);
    const digest = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  reason: bigint;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptPanicCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptPanic', 'ReceiptPanic', localName);
  }

  encode(value: ReceiptPanic): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('reason', 'u64').encode(value.reason));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptPanic, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('reason', 'u64').decode(data, o);
    const reason = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
    const is = decoded;

    return [
      {
        type: ReceiptType.Panic,
        id,
        reason,
        pc,
        is,
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
  val: bigint;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptRevertCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptRevert', 'ReceiptRevert', localName);
  }

  encode(value: ReceiptRevert): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('val', 'u64').encode(value.val));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptRevert, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('val', 'u64').decode(data, o);
    const val = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  val0: bigint;
  /** Value of register $rB (u64) */
  val1: bigint;
  /** Value of register $rC (u64) */
  val2: bigint;
  /** Value of register $rD (u64) */
  val3: bigint;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptLogCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptLog', 'ReceiptLog', localName);
  }

  encode(value: ReceiptLog): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('val0', 'u64').encode(value.val0));
    parts.push(new NumberCoder('val1', 'u64').encode(value.val1));
    parts.push(new NumberCoder('val2', 'u64').encode(value.val2));
    parts.push(new NumberCoder('val3', 'u64').encode(value.val3));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLog, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('val0', 'u64').decode(data, o);
    const val0 = decoded;
    [decoded, o] = new NumberCoder('val1', 'u64').decode(data, o);
    const val1 = decoded;
    [decoded, o] = new NumberCoder('val2', 'u64').decode(data, o);
    const val2 = decoded;
    [decoded, o] = new NumberCoder('val3', 'u64').decode(data, o);
    const val3 = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  val0: bigint;
  /** Value of register $rB (u64) */
  val1: bigint;
  /** Value of register $rC (u64) */
  ptr: bigint;
  /** Value of register $rD (u64) */
  len: bigint;
  /** Hash of MEM[$rC, $rD] (b256) */
  digest: string;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptLogDataCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptLogData', 'ReceiptLogData', localName);
  }

  encode(value: ReceiptLogData): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('id', 'b256').encode(value.id));
    parts.push(new NumberCoder('val0', 'u64').encode(value.val0));
    parts.push(new NumberCoder('val1', 'u64').encode(value.val1));
    parts.push(new NumberCoder('ptr', 'u64').encode(value.ptr));
    parts.push(new NumberCoder('len', 'u64').encode(value.len));
    parts.push(new B256Coder('digest', 'b256').encode(value.digest));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptLogData, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('id', 'b256').decode(data, o);
    const id = decoded;
    [decoded, o] = new NumberCoder('val0', 'u64').decode(data, o);
    const val0 = decoded;
    [decoded, o] = new NumberCoder('val1', 'u64').decode(data, o);
    const val1 = decoded;
    [decoded, o] = new NumberCoder('ptr', 'u64').decode(data, o);
    const ptr = decoded;
    [decoded, o] = new NumberCoder('len', 'u64').decode(data, o);
    const len = decoded;
    [decoded, o] = new B256Coder('digest', 'b256').decode(data, o);
    const digest = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  amount: bigint;
  /** Asset ID of coins transferred (b256) */
  assetId: string;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptTransferCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptTransfer', 'ReceiptTransfer', localName);
  }

  encode(value: ReceiptTransfer): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('from', 'address').encode(value.from));
    parts.push(new B256Coder('to', 'address').encode(value.to));
    parts.push(new NumberCoder('amount', 'u64').encode(value.amount));
    parts.push(new B256Coder('assetId', 'b256').encode(value.assetId));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransfer, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('from', 'address').decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder('to', 'address').decode(data, o);
    const to = decoded;
    [decoded, o] = new NumberCoder('amount', 'u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder('assetId', 'b256').decode(data, o);
    const assetId = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  amount: bigint;
  /** Asset ID of coins transferred (b256) */
  assetId: string;
  /** Value of register $pc (u64) */
  pc: bigint;
  /** Value of register $is (u64) */
  is: bigint;
};

export class ReceiptTransferOutCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptTransferOut', 'ReceiptTransferOut', localName);
  }

  encode(value: ReceiptTransferOut): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('from', 'address').encode(value.from));
    parts.push(new B256Coder('to', 'address').encode(value.to));
    parts.push(new NumberCoder('amount', 'u64').encode(value.amount));
    parts.push(new B256Coder('assetId', 'b256').encode(value.assetId));
    parts.push(new NumberCoder('pc', 'u64').encode(value.pc));
    parts.push(new NumberCoder('is', 'u64').encode(value.is));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptTransferOut, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('from', 'address').decode(data, o);
    const from = decoded;
    [decoded, o] = new B256Coder('to', 'address').decode(data, o);
    const to = decoded;
    [decoded, o] = new NumberCoder('amount', 'u64').decode(data, o);
    const amount = decoded;
    [decoded, o] = new B256Coder('assetId', 'b256').decode(data, o);
    const assetId = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
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
  result: bigint;
  /** Gas consumed by the script (u64) */
  gasUsed: bigint;
};

export class ReceiptScriptResultCoder extends Coder {
  constructor(localName: string) {
    super('ReceiptScriptResult', 'ReceiptScriptResult', localName);
  }

  encode(value: ReceiptScriptResult): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('result', 'u64').encode(value.result));
    parts.push(new NumberCoder('gasUsed', 'u64').encode(value.gasUsed));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [ReceiptScriptResult, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('result', 'u64').decode(data, o);
    const result = decoded;
    [decoded, o] = new NumberCoder('gasUsed', 'u64').decode(data, o);
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
  | ReceiptScriptResult;

export class ReceiptCoder extends Coder {
  constructor(localName: string) {
    super('Receipt', 'Receipt', localName);
  }

  encode(value: Receipt): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('type', 'u8').encode(value.type));
    switch (value.type) {
      case ReceiptType.Call: {
        parts.push(new ReceiptCallCoder('data').encode(value));
        break;
      }
      case ReceiptType.Return: {
        parts.push(new ReceiptReturnCoder('data').encode(value));
        break;
      }
      case ReceiptType.ReturnData: {
        parts.push(new ReceiptReturnDataCoder('data').encode(value));
        break;
      }
      case ReceiptType.Panic: {
        parts.push(new ReceiptPanicCoder('data').encode(value));
        break;
      }
      case ReceiptType.Revert: {
        parts.push(new ReceiptRevertCoder('data').encode(value));
        break;
      }
      case ReceiptType.Log: {
        parts.push(new ReceiptLogCoder('Coderdata').encode(value));
        break;
      }
      case ReceiptType.LogData: {
        parts.push(new ReceiptLogDataCoder('data').encode(value));
        break;
      }
      case ReceiptType.Transfer: {
        parts.push(new ReceiptTransferCoder('data').encode(value));
        break;
      }
      case ReceiptType.TransferOut: {
        parts.push(new ReceiptTransferOutCoder('data').encode(value));
        break;
      }
      case ReceiptType.ScriptResult: {
        parts.push(new ReceiptScriptResultCoder('data').encode(value));
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

    [decoded, o] = new NumberCoder('type', 'u8').decode(data, o);
    const type = decoded as ReceiptType;
    switch (type) {
      case ReceiptType.Call: {
        [decoded, o] = new ReceiptCallCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Return: {
        [decoded, o] = new ReceiptReturnCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.ReturnData: {
        [decoded, o] = new ReceiptReturnDataCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Panic: {
        [decoded, o] = new ReceiptPanicCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Revert: {
        [decoded, o] = new ReceiptRevertCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Log: {
        [decoded, o] = new ReceiptLogCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.LogData: {
        [decoded, o] = new ReceiptLogDataCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.Transfer: {
        [decoded, o] = new ReceiptTransferCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.TransferOut: {
        [decoded, o] = new ReceiptTransferOutCoder('data').decode(data, o);
        return [decoded, o];
      }
      case ReceiptType.ScriptResult: {
        [decoded, o] = new ReceiptScriptResultCoder('data').decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new Error('Invalid Receipt type');
      }
    }
  }
}
