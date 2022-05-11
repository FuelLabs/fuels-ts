/* eslint-disable max-classes-per-file */

import { concat } from '@ethersproject/bytes';
import { Coder, ArrayCoder, B256Coder, NumberCoder } from '@fuel-ts/abi-coder';

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
  gasPrice: bigint;
  /** Gas limit for transaction (u64) */
  gasLimit: bigint;
  /** Price per transaction byte (u64) */
  bytePrice: bigint;
  /** Block until which tx cannot be included (u64) */
  maturity: bigint;
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

export class TransactionScriptCoder extends Coder {
  constructor(localName: string) {
    super('TransactionScript', 'TransactionScript', localName);
  }

  encode(value: TransactionScript): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('gasPrice', 'u64').encode(value.gasPrice));
    parts.push(new NumberCoder('gasLimit', 'u64').encode(value.gasLimit));
    parts.push(new NumberCoder('bytePrice', 'u64').encode(value.bytePrice));
    parts.push(new NumberCoder('maturity', 'u32').encode(value.maturity));
    parts.push(new NumberCoder('scriptLength', 'u16').encode(value.scriptLength));
    parts.push(new NumberCoder('scriptDataLength', 'u16').encode(value.scriptDataLength));
    parts.push(new NumberCoder('inputsCount', 'u8').encode(value.inputsCount));
    parts.push(new NumberCoder('outputsCount', 'u8').encode(value.outputsCount));
    parts.push(new NumberCoder('witnessesCount', 'u8').encode(value.witnessesCount));
    parts.push(new B256Coder('receiptsRoot', 'b256').encode(value.receiptsRoot));
    parts.push(new ByteArrayCoder('script', value.scriptLength).encode(value.script));
    parts.push(new ByteArrayCoder('scriptData', value.scriptDataLength).encode(value.scriptData));
    parts.push(
      new ArrayCoder(new InputCoder('input'), value.inputsCount, 'inputs').encode(value.inputs)
    );
    parts.push(
      new ArrayCoder(new OutputCoder('output'), value.outputsCount, 'outputs').encode(value.outputs)
    );
    parts.push(
      new ArrayCoder(new WitnessCoder('witness'), value.witnessesCount, 'witnesses').encode(
        value.witnesses
      )
    );

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionScript, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('gasPrice', 'u64').decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new NumberCoder('gasLimit', 'u64').decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('bytePrice', 'u64').decode(data, o);
    const bytePrice = decoded;
    [decoded, o] = new NumberCoder('maturity', 'u64').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('scriptLength', 'u16').decode(data, o);
    [decoded, o] = new NumberCoder('scriptDataLength', 'u16').decode(data, o);
    [decoded, o] = new NumberCoder('inputsCount', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('outputsCount', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('witnessesCount', 'u8').decode(data, o);
    const scriptLength = decoded;
    const scriptDataLength = decoded;
    const inputsCount = decoded;
    const outputsCount = decoded;
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder('receiptsRoot', 'b256').decode(data, o);
    const receiptsRoot = decoded;
    [decoded, o] = new ByteArrayCoder('script', scriptLength).decode(data, o);
    const script = decoded;
    [decoded, o] = new ByteArrayCoder('scriptData', scriptDataLength).decode(data, o);
    const scriptData = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder('input'), inputsCount, 'inputs').decode(data, o);
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(new OutputCoder('output'), outputsCount, 'outputs').decode(
      data,
      o
    );
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(new WitnessCoder('witness'), witnessesCount, 'witnesses').decode(
      data,
      o
    );
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Script,
        gasPrice,
        gasLimit,
        bytePrice,
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
  gasPrice: bigint;
  /** Gas limit for transaction (u64) */
  gasLimit: bigint;
  /** Price per transaction byte (u64) */
  bytePrice: bigint;
  /** Block until which tx cannot be included (u64) */
  maturity: bigint;
  /** Contract bytecode length, in instructions (u16) */
  bytecodeLength: number;
  /** Witness index of contract bytecode to create (u8) */
  bytecodeWitnessIndex: number;
  /** Number of static contracts (u8) */
  staticContractsCount: number;
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
  /** List of static contracts (b256[]) */
  staticContracts: string[];
  /** List of inputs (StorageSlot[]) */
  storageSlots: StorageSlot[];
  /** List of inputs (Input[]) */
  inputs: Input[];
  /** List of outputs (Output[]) */
  outputs: Output[];
  /** List of witnesses (Witness[]) */
  witnesses: Witness[];
};

export class TransactionCreateCoder extends Coder {
  constructor(localName: string) {
    super('TransactionCreate', 'TransactionCreate', localName);
  }

  encode(value: TransactionCreate): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('gasPrice', 'u64').encode(value.gasPrice));
    parts.push(new NumberCoder('gasLimit', 'u64').encode(value.gasLimit));
    parts.push(new NumberCoder('bytePrice', 'u64').encode(value.bytePrice));
    parts.push(new NumberCoder('maturity', 'u64').encode(value.maturity));
    parts.push(new NumberCoder('bytecodeLength', 'u16').encode(value.bytecodeLength));
    parts.push(new NumberCoder('bytecodeWitnessIndex', 'u8').encode(value.bytecodeWitnessIndex));
    parts.push(new NumberCoder('staticContractsCount', 'u8').encode(value.staticContractsCount));
    parts.push(new NumberCoder('storageSlotsCount', 'u16').encode(value.storageSlotsCount));
    parts.push(new NumberCoder('inputsCount', 'u8').encode(value.inputsCount));
    parts.push(new NumberCoder('outputsCount', 'u8').encode(value.outputsCount));
    parts.push(new NumberCoder('witnessesCount', 'u8').encode(value.witnessesCount));
    parts.push(new B256Coder('salt', 'b256').encode(value.salt));
    parts.push(
      new ArrayCoder(
        new B256Coder('staticContract', 'b256'),
        value.staticContractsCount,
        'staticContracts'
      ).encode(value.staticContracts)
    );
    parts.push(
      new ArrayCoder(
        new StorageSlotCoder('storageSlot'),
        value.storageSlotsCount,
        'storageSlots'
      ).encode(value.storageSlots)
    );
    parts.push(
      new ArrayCoder(new InputCoder('input'), value.inputsCount, 'inputs').encode(value.inputs)
    );
    parts.push(
      new ArrayCoder(new OutputCoder('output'), value.outputsCount, 'outputs').encode(value.outputs)
    );
    parts.push(
      new ArrayCoder(new WitnessCoder('witness'), value.witnessesCount, 'witnesses').encode(
        value.witnesses
      )
    );

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionCreate, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('gasPrice', 'u64').decode(data, o);
    const gasPrice = decoded;
    [decoded, o] = new NumberCoder('gasLimit', 'u64').decode(data, o);
    const gasLimit = decoded;
    [decoded, o] = new NumberCoder('bytePrice', 'u64').decode(data, o);
    const bytePrice = decoded;
    [decoded, o] = new NumberCoder('maturity', 'u64').decode(data, o);
    const maturity = decoded;
    [decoded, o] = new NumberCoder('bytecodeLength', 'u16').decode(data, o);
    [decoded, o] = new NumberCoder('bytecodeWitnessIndex', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('staticContractsCount', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('storageSlotsCount', 'u16').decode(data, o);
    [decoded, o] = new NumberCoder('inputsCount', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('outputsCount', 'u8').decode(data, o);
    [decoded, o] = new NumberCoder('witnessesCount', 'u8').decode(data, o);
    const bytecodeLength = decoded;
    const bytecodeWitnessIndex = decoded;
    const staticContractsCount = decoded;
    const storageSlotsCount = decoded;
    const inputsCount = decoded;
    const outputsCount = decoded;
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder('salt', 'b256').decode(data, o);
    const salt = decoded;
    [decoded, o] = new ArrayCoder(
      new B256Coder('staticContract', 'b256'),
      staticContractsCount,
      'staticContracts'
    ).decode(data, o);
    const staticContracts = decoded;
    [decoded, o] = new ArrayCoder(
      new StorageSlotCoder('storageSlot'),
      storageSlotsCount,
      'storageSlots'
    ).decode(data, o);
    const storageSlots = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder('input'), inputsCount, 'inputs').decode(data, o);
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(new OutputCoder('output'), outputsCount, 'outputs').decode(
      data,
      o
    );
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(new WitnessCoder('witness'), witnessesCount, 'witnesses').decode(
      data,
      o
    );
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Create,
        gasPrice,
        gasLimit,
        bytePrice,
        maturity,
        bytecodeLength,
        bytecodeWitnessIndex,
        staticContractsCount,
        storageSlotsCount,
        inputsCount,
        outputsCount,
        witnessesCount,
        salt,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignores
        staticContracts,
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

export class TransactionCoder extends Coder {
  constructor(localName: string) {
    super('Transaction', 'Transaction', localName);
  }

  encode(value: Transaction): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('type', 'u8').encode(value.type));
    switch (value.type) {
      case TransactionType.Script: {
        parts.push(new TransactionScriptCoder('data').encode(value));
        break;
      }
      case TransactionType.Create: {
        parts.push(new TransactionCreateCoder('data').encode(value));
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

    [decoded, o] = new NumberCoder('type', 'u8').decode(data, o);
    const type = decoded as TransactionType;
    switch (type) {
      case TransactionType.Script: {
        [decoded, o] = new TransactionScriptCoder('data').decode(data, o);
        return [decoded, o];
      }
      case TransactionType.Create: {
        [decoded, o] = new TransactionCreateCoder('data').decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new Error('Invalid Input type');
      }
    }
  }
}
