/* eslint-disable max-classes-per-file */

import { concat } from '@ethersproject/bytes';
import { Coder, ArrayCoder, U64Coder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';

import { ByteArrayCoder } from './byte-array';
import type { Input } from './input';
import { InputCoder } from './input';
import type { Output } from './output';
import { OutputCoder } from './output';
import { StorageSlotCoder } from './storage-slot';
import type { StorageSlot } from './storage-slot';
import type { Witness } from './witness';
import { WitnessCoder } from './witness';

export enum TransactionType /* u8 */ {
  Script = 0,
  Create = 1,
}

export type TransactionScript = {
  type: TransactionType.Script;

  /** Gas price for transaction (u64) */
  gasPrice: BN;

  /** Gas limit for transaction (u64) */
  gasLimit: BN;

  /** Block until which tx cannot be included (u32) */
  maturity: number;

  /** Script length, in instructions (u16) */
  scriptLength: number;

  /** Length of script input data, in bytes (u16) */
  scriptDataLength: number;

  /** Number of inputs (u8) */
  inputsCount: number;

  /** Number of outputs (u8) */
  outputsCount: number;

  /** Number of witnesses (u8) */
  witnessesCount: number;

  /** Merkle root of receipts (b256) */
  receiptsRoot: string;

  /** Script to execute (byte[]) */
  script: string;

  /** Script input data (parameters) (byte[]) */
  scriptData: string;

  /** List of inputs (Input[]) */
  inputs: Input[];

  /** List of outputs (Output[]) */
  outputs: Output[];

  /** List of witnesses (Witness[]) */
  witnesses: Witness[];
};

export class TransactionScriptCoder extends Coder<TransactionScript, TransactionScript> {
  constructor() {
    super('TransactionScript', 'struct TransactionScript', 0);
  }

  encode(value: TransactionScript): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new U64Coder().encode(value.gasPrice));
    parts.push(new U64Coder().encode(value.gasLimit));
    parts.push(new NumberCoder('u32').encode(value.maturity));
    parts.push(new NumberCoder('u16').encode(value.scriptLength));
    parts.push(new NumberCoder('u16').encode(value.scriptDataLength));
    parts.push(new NumberCoder('u8').encode(value.inputsCount));
    parts.push(new NumberCoder('u8').encode(value.outputsCount));
    parts.push(new NumberCoder('u8').encode(value.witnessesCount));
    parts.push(new B256Coder().encode(value.receiptsRoot));
    parts.push(new ByteArrayCoder(value.scriptLength).encode(value.script));
    parts.push(new ByteArrayCoder(value.scriptDataLength).encode(value.scriptData));
    parts.push(new ArrayCoder(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(new ArrayCoder(new OutputCoder(), value.outputsCount).encode(value.outputs));
    parts.push(new ArrayCoder(new WitnessCoder(), value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionScript, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new U64Coder().decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const scriptLength = decoded;
    const scriptDataLength = decoded;
    const inputsCount = decoded;
    const outputsCount = decoded;
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const receiptsRoot = decoded;
    [decoded, o] = new ByteArrayCoder(scriptLength).decode(data, o);
    const script = decoded;
    [decoded, o] = new ByteArrayCoder(scriptDataLength).decode(data, o);
    const scriptData = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(new OutputCoder(), outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(new WitnessCoder(), witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Script,
        gasPrice,
        gasLimit,
        maturity,
        scriptLength,
        scriptDataLength,
        inputsCount,
        outputsCount,
        witnessesCount,
        receiptsRoot,
        script,
        scriptData,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        outputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        witnesses,
      },
      o,
    ];
  }
}

export type TransactionCreate = {
  type: TransactionType.Create;

  /** Gas price for transaction (u64) */
  gasPrice: BN;

  /** Gas limit for transaction (u64) */
  gasLimit: BN;

  /** Block until which tx cannot be included (u32) */
  maturity: number;

  /** Contract bytecode length, in instructions (u16) */
  bytecodeLength: number;

  /** Witness index of contract bytecode to create (u8) */
  bytecodeWitnessIndex: number;

  /** Number of storage slots to initialize (u16) */
  storageSlotsCount: number;

  /** Number of inputs (u8) */
  inputsCount: number;

  /** Number of outputs (u8) */
  outputsCount: number;

  /** Number of witnesses (u8) */
  witnessesCount: number;

  /** Salt (b256) */
  salt: string;

  /** List of inputs (StorageSlot[]) */
  storageSlots: StorageSlot[];

  /** List of inputs (Input[]) */
  inputs: Input[];

  /** List of outputs (Output[]) */
  outputs: Output[];

  /** List of witnesses (Witness[]) */
  witnesses: Witness[];
};

export class TransactionCreateCoder extends Coder<TransactionCreate, TransactionCreate> {
  constructor() {
    super('TransactionCreate', 'struct TransactionCreate', 0);
  }

  encode(value: TransactionCreate): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new U64Coder().encode(value.gasPrice));
    parts.push(new U64Coder().encode(value.gasLimit));
    parts.push(new NumberCoder('u32').encode(value.maturity));
    parts.push(new NumberCoder('u16').encode(value.bytecodeLength));
    parts.push(new NumberCoder('u8').encode(value.bytecodeWitnessIndex));
    parts.push(new NumberCoder('u16').encode(value.storageSlotsCount));
    parts.push(new NumberCoder('u8').encode(value.inputsCount));
    parts.push(new NumberCoder('u8').encode(value.outputsCount));
    parts.push(new NumberCoder('u8').encode(value.witnessesCount));
    parts.push(new B256Coder().encode(value.salt));
    parts.push(
      new ArrayCoder(new StorageSlotCoder(), value.storageSlotsCount).encode(value.storageSlots)
    );
    parts.push(new ArrayCoder(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(new ArrayCoder(new OutputCoder(), value.outputsCount).encode(value.outputs));
    parts.push(new ArrayCoder(new WitnessCoder(), value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionCreate, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new U64Coder().decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new U64Coder().decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const bytecodeLength = decoded;
    const bytecodeWitnessIndex = decoded;
    const storageSlotsCount = decoded;
    const inputsCount = decoded;
    const outputsCount = decoded;
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const salt = decoded;
    [decoded, o] = new ArrayCoder(new StorageSlotCoder(), storageSlotsCount).decode(data, o);
    const storageSlots = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(new OutputCoder(), outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(new WitnessCoder(), witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Create,
        gasPrice,
        gasLimit,
        maturity,
        bytecodeLength,
        bytecodeWitnessIndex,
        storageSlotsCount,
        inputsCount,
        outputsCount,
        witnessesCount,
        salt,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        storageSlots,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        inputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        outputs,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        witnesses,
      },
      o,
    ];
  }
}

export type Transaction = TransactionScript | TransactionCreate;

export class TransactionCoder extends Coder<Transaction, Transaction> {
  constructor() {
    super('Transaction', 'struct Transaction', 0);
  }

  encode(value: Transaction): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.type));
    switch (value.type) {
      case TransactionType.Script: {
        parts.push(new TransactionScriptCoder().encode(value));
        break;
      }
      case TransactionType.Create: {
        parts.push(new TransactionCreateCoder().encode(value));
        break;
      }
      default: {
        throw new Error('Invalid Transaction type');
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Transaction, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const type = decoded as TransactionType;
    switch (type) {
      case TransactionType.Script: {
        [decoded, o] = new TransactionScriptCoder().decode(data, o);
        return [decoded, o];
      }
      case TransactionType.Create: {
        [decoded, o] = new TransactionCreateCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new Error('Invalid Input type');
      }
    }
  }
}
