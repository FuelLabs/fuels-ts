import type { BN } from '@fuel-ts/math';

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

export type ReceiptScriptResult = {
  type: ReceiptType.ScriptResult;
  /** Result variant with embedded `PanicReason` in first 8 bits and `instr` (u64) */
  result: BN;
  /** Gas consumed by the script (u64) */
  gasUsed: BN;
};

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
