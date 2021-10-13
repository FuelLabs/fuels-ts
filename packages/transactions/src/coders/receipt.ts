/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import { BigNumber } from '@ethersproject/bignumber';
import { concat } from '@ethersproject/bytes';
import { Coder, B256Coder, NumberCoder } from '@fuels-ts/abi-coder';

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
}

export type Receipt =
  | {
      type: ReceiptType.Call;
      data: ReceiptCall;
    }
  | {
      type: ReceiptType.Return;
      data: ReceiptReturn;
    }
  | {
      type: ReceiptType.ReturnData;
      data: ReceiptReturnData;
    }
  | {
      type: ReceiptType.Panic;
      data: ReceiptPanic;
    }
  | {
      type: ReceiptType.Revert;
      data: ReceiptRevert;
    }
  | {
      type: ReceiptType.Log;
      data: ReceiptLog;
    }
  | {
      type: ReceiptType.LogData;
      data: ReceiptLogData;
    }
  | {
      type: ReceiptType.Transfer;
      data: ReceiptTransfer;
    }
  | {
      type: ReceiptType.TransferOut;
      data: ReceiptTransferOut;
    };

export class ReceiptCoder extends Coder {
  constructor(localName: string) {
    super('Receipt', 'Receipt', localName);
  }

  encode(value: Receipt): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('type', 'u8').encode(value.type));
    switch (value.type) {
      case ReceiptType.Call: {
        parts.push(new ReceiptCallCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.Return: {
        parts.push(new ReceiptReturnCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.ReturnData: {
        parts.push(new ReceiptReturnDataCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.Panic: {
        parts.push(new ReceiptPanicCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.Revert: {
        parts.push(new ReceiptRevertCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.Log: {
        parts.push(new ReceiptLogCoder('Coderdata').encode(value.data));
        break;
      }
      case ReceiptType.LogData: {
        parts.push(new ReceiptLogDataCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.Transfer: {
        parts.push(new ReceiptTransferCoder('data').encode(value.data));
        break;
      }
      case ReceiptType.TransferOut: {
        parts.push(new ReceiptTransferOutCoder('data').encode(value.data));
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
    const type = decoded.toNumber() as ReceiptType;
    switch (type) {
      case ReceiptType.Call: {
        [decoded, o] = new ReceiptCallCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.Return: {
        [decoded, o] = new ReceiptReturnCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.ReturnData: {
        [decoded, o] = new ReceiptReturnDataCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.Panic: {
        [decoded, o] = new ReceiptPanicCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.Revert: {
        [decoded, o] = new ReceiptRevertCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.Log: {
        [decoded, o] = new ReceiptLogCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.LogData: {
        [decoded, o] = new ReceiptLogDataCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.Transfer: {
        [decoded, o] = new ReceiptTransferCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      case ReceiptType.TransferOut: {
        [decoded, o] = new ReceiptTransferOutCoder('data').decode(data, o);
        return [
          {
            type,
            data: decoded,
          },
          o,
        ];
      }
      default: {
        throw new Error('Invalid Output type');
      }
    }
  }
}

type ReceiptCall = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  from: string;
  // 	Contract ID of called contract (b256)
  to: string;
  // 	Amount of coins to forward, i.e. $rB (u64)
  amount: BigNumber;
  // 	Color of coins to forward, i.e. MEM[$rC, 32] (b256)
  color: string;
  // 	Gas to forward, i.e. $rD (u64)
  gas: BigNumber;
  // 	First parameter (u64)
  param1: BigNumber;
  // 	Second parameter (u64)
  param2: BigNumber;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
    parts.push(new B256Coder('color', 'b256').encode(value.color));
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
    [decoded, o] = new B256Coder('color', 'b256').decode(data, o);
    const color = decoded;
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
        from,
        to,
        amount,
        color,
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

type ReceiptReturn = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Value of register $rA (u64)
  val: BigNumber;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
        id,
        val,
        pc,
        is,
      },
      o,
    ];
  }
}

type ReceiptReturnData = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Value of register $rA (u64)
  ptr: BigNumber;
  // 	Value of register $rB (u64)
  len: BigNumber;
  // 	Hash of MEM[$rA, $rB] (b256)
  digest: string;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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

type ReceiptPanic = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Panic reason (u64)
  reason: BigNumber;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
        id,
        reason,
        pc,
        is,
      },
      o,
    ];
  }
}

type ReceiptRevert = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Value of register $rA (u64)
  val: BigNumber;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
        id,
        val,
        pc,
        is,
      },
      o,
    ];
  }
}

type ReceiptLog = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Value of register $rA (u64)
  val0: BigNumber;
  // 	Value of register $rB (u64)
  val1: BigNumber;
  // 	Value of register $rC (u64)
  val2: BigNumber;
  // 	Value of register $rD (u64)
  val3: BigNumber;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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

type ReceiptLogData = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  id: string;
  // 	Value of register $rA (u64)
  val0: BigNumber;
  // 	Value of register $rB (u64)
  val1: BigNumber;
  // 	Value of register $rC (u64)
  ptr: BigNumber;
  // 	Value of register $rD (u64)
  len: BigNumber;
  // 	Hash of MEM[$rC, $rD] (b256)
  digest: string;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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

type ReceiptTransfer = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  from: string;
  // 	Contract ID of contract to transfer coins to (b256)
  to: string;
  // 	Amount of coins transferred (u64)
  amount: BigNumber;
  // 	Color of coins transferred (b256)
  color: string;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
    parts.push(new B256Coder('color', 'b256').encode(value.color));
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
    [decoded, o] = new B256Coder('color', 'b256').decode(data, o);
    const color = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
    const is = decoded;

    return [
      {
        from,
        to,
        amount,
        color,
        pc,
        is,
      },
      o,
    ];
  }
}

type ReceiptTransferOut = {
  // 	Contract ID of current context if in an internal context, zero otherwise (b256)
  from: string;
  // 	Address to transfer coins to (b256)
  to: string;
  // 	Amount of coins transferred (u64)
  amount: BigNumber;
  // 	Color of coins transferred (b256)
  color: string;
  // 	Value of register $pc (u64)
  pc: BigNumber;
  // 	Value of register $is (u64)
  is: BigNumber;
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
    parts.push(new B256Coder('color', 'b256').encode(value.color));
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
    [decoded, o] = new B256Coder('color', 'b256').decode(data, o);
    const color = decoded;
    [decoded, o] = new NumberCoder('pc', 'u64').decode(data, o);
    const pc = decoded;
    [decoded, o] = new NumberCoder('is', 'u64').decode(data, o);
    const is = decoded;

    return [
      {
        from,
        to,
        amount,
        color,
        pc,
        is,
      },
      o,
    ];
  }
}
