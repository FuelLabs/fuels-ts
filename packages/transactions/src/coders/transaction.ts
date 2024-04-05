/* eslint-disable max-classes-per-file */

import { Coder, ArrayCoder, B256Coder, NumberCoder, BigNumberCoder } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { type BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { ByteArrayCoder } from './byte-array';
import type { Input, InputContract } from './input';
import { InputCoder, InputContractCoder } from './input';
import type { Output, OutputContract } from './output';
import { OutputCoder, OutputContractCoder } from './output';
import type { Policy } from './policy';
import { PoliciesCoder } from './policy';
import { StorageSlotCoder } from './storage-slot';
import type { StorageSlot } from './storage-slot';
import type { TxPointer } from './tx-pointer';
import { TxPointerCoder } from './tx-pointer';
import type { Witness } from './witness';
import { WitnessCoder } from './witness';

export enum TransactionType /* u8 */ {
  Script = 0,
  Create = 1,
  Mint = 2,
}

export type TransactionScript = {
  type: TransactionType.Script;

  /** Gas limit for transaction (u64) */
  scriptGasLimit: BN;

  /** Merkle root of receipts (b256) */
  receiptsRoot: string;

  /** Script length, in instructions (u16) */
  scriptLength: number;

  /** Length of script input data, in bytes (u16) */
  scriptDataLength: number;

  /** Bitfield of used policy types (u32) */
  policyTypes: number;

  /** Number of inputs (u8) */
  inputsCount: number;

  /** Number of outputs (u8) */
  outputsCount: number;

  /** Number of witnesses (u8) */
  witnessesCount: number;

  /** Script to execute (byte[]) */
  script: string;

  /** Script input data (parameters) (byte[]) */
  scriptData: string;

  /** List of policies, sorted by PolicyType. */
  policies: Policy[];

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

    parts.push(new BigNumberCoder('u64').encode(value.scriptGasLimit));
    parts.push(new B256Coder().encode(value.receiptsRoot));
    parts.push(new NumberCoder('u32').encode(value.policyTypes));
    parts.push(new NumberCoder('u16').encode(value.witnessesCount));
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(new ArrayCoder(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(new ArrayCoder(new OutputCoder(), value.outputsCount).encode(value.outputs));
    parts.push(new ArrayCoder(new WitnessCoder(), value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionScript, number] {
    let decoded;
    let o = offset;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const scriptGasLimit = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const receiptsRoot = decoded;
    const scriptLength = decoded;
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const scriptDataLength = decoded;
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new ByteArrayCoder(scriptLength.toNumber()).decode(data, o);
    const script = decoded;
    [decoded, o] = new ByteArrayCoder(scriptDataLength).decode(data, o);
    const scriptData = decoded;
    [decoded, o] = new PoliciesCoder().decode(data, o, policyTypes);
    const policies = decoded;
    [decoded, o] = new ArrayCoder(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = new ArrayCoder(new OutputCoder(), outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = new ArrayCoder(new WitnessCoder(), witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Script,
        scriptGasLimit,
        scriptLength,
        scriptDataLength,
        policyTypes,
        inputsCount,
        outputsCount,
        witnessesCount,
        receiptsRoot,
        script,
        scriptData,
        policies,
        inputs,
        outputs,
        witnesses,
      },
      o,
    ];
  }
}

export type TransactionCreate = {
  type: TransactionType.Create;

  /** Contract bytecode length, in instructions (u16) */
  bytecodeLength: number;

  /** Witness index of contract bytecode to create (u8) */
  bytecodeWitnessIndex: number;

  /** Bitfield of used policy types (u32) */
  policyTypes: number;

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

  /** List of policies. */
  policies: Policy[];

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

    parts.push(new NumberCoder('u32').encode(value.bytecodeLength));
    parts.push(new NumberCoder('u8').encode(value.bytecodeWitnessIndex));
    parts.push(new NumberCoder('u32').encode(value.policyTypes));
    parts.push(new NumberCoder('u16').encode(value.storageSlotsCount));
    parts.push(new NumberCoder('u8').encode(value.inputsCount));
    parts.push(new NumberCoder('u8').encode(value.outputsCount));
    parts.push(new NumberCoder('u8').encode(value.witnessesCount));
    parts.push(new B256Coder().encode(value.salt));
    parts.push(new PoliciesCoder().encode(value.policies));
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

    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const bytecodeLength = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const bytecodeWitnessIndex = decoded;
    [decoded, o] = new NumberCoder('u32').decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = new NumberCoder('u16').decode(data, o);
    const storageSlotsCount = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = new NumberCoder('u8').decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const salt = decoded;
    [decoded, o] = new PoliciesCoder().decode(data, o, policyTypes);
    const policies = decoded;
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
        bytecodeLength,
        bytecodeWitnessIndex,
        policyTypes,
        storageSlotsCount,
        inputsCount,
        outputsCount,
        witnessesCount,
        salt,
        policies,
        storageSlots,
        inputs,
        outputs,
        witnesses,
      },
      o,
    ];
  }
}

export type TransactionMint = {
  type: TransactionType.Mint;

  /** The location of the Mint transaction in the block. */
  txPointer: TxPointer;

  /** The contract utxo that assets are minted to. */
  inputContract: InputContract;

  /** The contract utxo that assets are being minted to. */
  outputContract: OutputContract;

  /** The amount of funds minted. */
  mintAmount: BN;

  /** The asset ID corresponding to the minted amount. */
  mintAssetId: string;
};

export class TransactionMintCoder extends Coder<TransactionMint, TransactionMint> {
  constructor() {
    super('TransactionMint', 'struct TransactionMint', 0);
  }

  encode(value: TransactionMint): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new TxPointerCoder().encode(value.txPointer));
    parts.push(new InputContractCoder().encode(value.inputContract));
    parts.push(new OutputContractCoder().encode(value.outputContract));
    parts.push(new BigNumberCoder('u64').encode(value.mintAmount));
    parts.push(new B256Coder().encode(value.mintAssetId));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionMint, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new TxPointerCoder().decode(data, o);
    const txPointer = decoded;
    [decoded, o] = new InputContractCoder().decode(data, o);
    const inputContract = decoded;
    [decoded, o] = new OutputContractCoder().decode(data, o);
    const outputContract = decoded;
    [decoded, o] = new BigNumberCoder('u64').decode(data, o);
    const mintAmount = decoded;
    [decoded, o] = new B256Coder().decode(data, o);
    const mintAssetId = decoded;

    return [
      {
        type: TransactionType.Mint,
        txPointer,
        inputContract,
        outputContract,
        mintAmount,
        mintAssetId,
      },
      o,
    ];
  }
}
type PossibleTransactions = TransactionScript | TransactionCreate | TransactionMint;
export type Transaction<TTransactionType = void> = TTransactionType extends TransactionType
  ? Extract<PossibleTransactions, { type: TTransactionType }>
  : Partial<Omit<TransactionScript, 'type'>> &
      Partial<Omit<TransactionCreate, 'type'>> &
      Partial<Omit<TransactionMint, 'type'>> & {
        type: TransactionType;
      };

export class TransactionCoder extends Coder<Transaction, Transaction> {
  constructor() {
    super('Transaction', 'struct Transaction', 0);
  }

  encode(value: Transaction): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u8').encode(value.type));

    const { type } = value;

    switch (value.type) {
      case TransactionType.Script: {
        parts.push(
          new TransactionScriptCoder().encode(value as Transaction<TransactionType.Script>)
        );
        break;
      }
      case TransactionType.Create: {
        parts.push(
          new TransactionCreateCoder().encode(value as Transaction<TransactionType.Create>)
        );
        break;
      }
      case TransactionType.Mint: {
        parts.push(new TransactionMintCoder().encode(value as Transaction<TransactionType.Mint>));
        break;
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${type}`
        );
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
      case TransactionType.Mint: {
        [decoded, o] = new TransactionMintCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new FuelError(
          ErrorCode.INVALID_TRANSACTION_TYPE,
          `Invalid transaction type: ${type}`
        );
      }
    }
  }
}
