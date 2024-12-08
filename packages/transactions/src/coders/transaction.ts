/* eslint-disable max-classes-per-file */

import { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { type BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { byteArray } from './byte-array';
import { coders } from './coders';
import type { Input, InputContract } from './input';
import { InputCoder, inputContractCoder } from './input';
import type { Output, OutputContract } from './output';
import { outputCoder, outputContractCoder } from './output';
import type { Policy } from './policy';
import { PoliciesCoder } from './policy';
import { storageSlotCoder } from './storage-slot';
import type { StorageSlot } from './storage-slot';
import type { TxPointer } from './tx-pointer';
import { txPointerCoder } from './tx-pointer';
import { UpgradePurposeCoder, type UpgradePurpose } from './upgrade-purpose';
import type { Witness } from './witness';
import { witnessCoder } from './witness';

export enum TransactionType /* u8 */ {
  Script = 0,
  Create = 1,
  Mint = 2,
  Upgrade = 3,
  Upload = 4,
  Blob = 5,
}

/** @hidden */
export type BaseTransactionType = {
  /** The type of the transaction */
  type: TransactionType;
  /** List of witnesses (Witness[]) */
  witnesses: Witness[];

  /** Number of witnesses (u16) */
  witnessesCount: number;

  /** List of outputs (Output[]) */
  outputs: Output[];

  /** List of inputs (Input[]) */
  inputs: Input[];

  /** List of policies. */
  policies: Policy[];

  /** Bitfield of used policy types (u32) */
  policyTypes: number;

  /** Number of inputs (u16) */
  inputsCount: number;

  /** Number of outputs (u16) */
  outputsCount: number;
};

export type TransactionScript = BaseTransactionType & {
  type: TransactionType.Script;

  /** Gas limit for transaction (u64) */
  scriptGasLimit: BN;

  /** Merkle root of receipts (b256) */
  receiptsRoot: string;

  /** Script length, in instructions (u64) */
  scriptLength: BN;

  /** Length of script input data, in bytes (u64) */
  scriptDataLength: BN;

  /** Script to execute (byte[]) */
  script: string;

  /** Script input data (parameters) (byte[]) */
  scriptData: string;
};

export class TransactionScriptCoder extends Coder<TransactionScript, TransactionScript> {
  override type = 'TransactionScript';

  encode(value: TransactionScript): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u64.encode(value.scriptGasLimit));
    parts.push(coders.b256.encode(value.receiptsRoot));
    parts.push(coders.u64.encode(value.scriptLength));
    parts.push(coders.u64.encode(value.scriptDataLength));
    parts.push(coders.u32.encode(value.policyTypes));
    parts.push(coders.u16.encode(value.inputsCount));
    parts.push(coders.u16.encode(value.outputsCount));
    parts.push(coders.u16.encode(value.witnessesCount));
    parts.push(byteArray(value.scriptLength.toNumber()).encode(value.script));
    parts.push(byteArray(value.scriptDataLength.toNumber()).encode(value.scriptData));
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(coders.array(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(coders.array(outputCoder, value.outputsCount).encode(value.outputs));
    parts.push(coders.array(witnessCoder, value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionScript, number] {
    let decoded;
    let o = offset;
    [decoded, o] = coders.u64.decode(data, o);
    const scriptGasLimit = decoded;
    [decoded, o] = coders.b256.decode(data, o);
    const receiptsRoot = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const scriptLength = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const scriptDataLength = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = byteArray(scriptLength.toNumber()).decode(data, o);
    const script = decoded;
    [decoded, o] = byteArray(scriptDataLength.toNumber()).decode(data, o);
    const scriptData = decoded;
    [decoded, o] = new PoliciesCoder(policyTypes).decode(data, o);
    const policies = decoded;
    [decoded, o] = coders.array(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = coders.array(outputCoder, outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = coders.array(witnessCoder, witnessesCount).decode(data, o);
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

export type TransactionCreate = BaseTransactionType & {
  type: TransactionType.Create;

  /** Witness index of contract bytecode to create (u8) */
  bytecodeWitnessIndex: number;

  /** Salt (b256) */
  salt: string;

  /** Number of storage slots to initialize (u16) */
  storageSlotsCount: BN;

  /** List of inputs (StorageSlot[]) */
  storageSlots: StorageSlot[];
};

export class TransactionCreateCoder extends Coder<TransactionCreate, TransactionCreate> {
  override type = 'TransactionCreate';

  encode(value: TransactionCreate): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u16.encode(value.bytecodeWitnessIndex));
    parts.push(coders.b256.encode(value.salt));
    parts.push(coders.u64.encode(value.storageSlotsCount));
    parts.push(coders.u32.encode(value.policyTypes));
    parts.push(coders.u16.encode(value.inputsCount));
    parts.push(coders.u16.encode(value.outputsCount));
    parts.push(coders.u16.encode(value.witnessesCount));
    parts.push(
      coders.array(storageSlotCoder, value.storageSlotsCount.toNumber()).encode(value.storageSlots)
    );
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(coders.array(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(coders.array(outputCoder, value.outputsCount).encode(value.outputs));
    parts.push(coders.array(witnessCoder, value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionCreate, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.u16.decode(data, o);
    const bytecodeWitnessIndex = decoded;
    [decoded, o] = coders.b256.decode(data, o);
    const salt = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const storageSlotsCount = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = coders.array(storageSlotCoder, storageSlotsCount.toNumber()).decode(data, o);
    const storageSlots = decoded;
    [decoded, o] = new PoliciesCoder(policyTypes).decode(data, o);
    const policies = decoded;
    [decoded, o] = coders.array(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = coders.array(outputCoder, outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = coders.array(witnessCoder, witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Create,
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

  gasPrice: BN;
};

export class TransactionMintCoder extends Coder<TransactionMint, TransactionMint> {
  override type = 'TransactionMint';

  encode(value: TransactionMint): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(txPointerCoder.encode(value.txPointer));
    parts.push(inputContractCoder.encode(value.inputContract));
    parts.push(outputContractCoder.encode(value.outputContract));
    parts.push(coders.u64.encode(value.mintAmount));
    parts.push(coders.b256.encode(value.mintAssetId));
    parts.push(coders.u64.encode(value.gasPrice));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionMint, number] {
    let decoded;
    let o = offset;

    [decoded, o] = txPointerCoder.decode(data, o);
    const txPointer = decoded;
    [decoded, o] = inputContractCoder.decode(data, o);
    const inputContract = decoded;
    [decoded, o] = outputContractCoder.decode(data, o);
    const outputContract = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const mintAmount = decoded;
    [decoded, o] = coders.b256.decode(data, o);
    const mintAssetId = decoded;
    [decoded, o] = coders.u64.decode(data, o);
    const gasPrice = decoded;

    return [
      {
        type: TransactionType.Mint,
        txPointer,
        inputContract,
        outputContract,
        mintAmount,
        mintAssetId,
        gasPrice,
      },
      o,
    ];
  }
}

export type TransactionUpgrade = BaseTransactionType & {
  type: TransactionType.Upgrade;

  /** The purpose of the upgrade. */
  upgradePurpose: UpgradePurpose;
};

export class TransactionUpgradeCoder extends Coder<TransactionUpgrade, TransactionUpgrade> {
  override type = 'TransactionUpgrade';

  encode(value: TransactionUpgrade): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new UpgradePurposeCoder().encode(value.upgradePurpose));
    parts.push(coders.u32.encode(value.policyTypes));
    parts.push(coders.u16.encode(value.inputsCount));
    parts.push(coders.u16.encode(value.outputsCount));
    parts.push(coders.u16.encode(value.witnessesCount));
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(coders.array(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(coders.array(outputCoder, value.outputsCount).encode(value.outputs));
    parts.push(coders.array(witnessCoder, value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionUpgrade, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new UpgradePurposeCoder().decode(data, o);
    const upgradePurpose = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new PoliciesCoder(policyTypes).decode(data, o);
    const policies = decoded;
    [decoded, o] = coders.array(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = coders.array(outputCoder, outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = coders.array(witnessCoder, witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Upgrade,
        upgradePurpose,
        policyTypes,
        inputsCount,
        outputsCount,
        witnessesCount,
        policies,
        inputs,
        outputs,
        witnesses,
      },
      o,
    ];
  }
}

export type TransactionUpload = BaseTransactionType & {
  type: TransactionType.Upload;

  /** The root of the Merkle tree is created over the bytecode. (b256) */
  root: string;

  /** Index of witness that authorizes spending the coin (u16) */
  witnessIndex: number;

  /** The index of the subsection of the bytecode. (u16) */
  subsectionIndex: number;

  /** The total number of subsections on which bytecode was divided. (u16) */
  subsectionsNumber: number;

  /** Number of Merkle nodes in the proof. (u16) */
  proofSetCount: number;

  /** List of proof nodes (b256[]) */
  proofSet: string[];
};

export class TransactionUploadCoder extends Coder<TransactionUpload, TransactionUpload> {
  override type = 'TransactionUpload';

  encode(value: TransactionUpload): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.b256.encode(value.root));
    parts.push(coders.u16.encode(value.witnessIndex));
    parts.push(coders.u16.encode(value.subsectionIndex));
    parts.push(coders.u16.encode(value.subsectionsNumber));
    parts.push(coders.u16.encode(value.proofSetCount));
    parts.push(coders.u32.encode(value.policyTypes));
    parts.push(coders.u16.encode(value.inputsCount));
    parts.push(coders.u16.encode(value.outputsCount));
    parts.push(coders.u16.encode(value.witnessesCount));
    parts.push(coders.array(coders.b256, value.proofSetCount).encode(value.proofSet));
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(coders.array(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(coders.array(outputCoder, value.outputsCount).encode(value.outputs));
    parts.push(coders.array(witnessCoder, value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionUpload, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.b256.decode(data, o);
    const root = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessIndex = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const subsectionIndex = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const subsectionsNumber = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const proofSetCount = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = coders.array(coders.b256, proofSetCount).decode(data, o);
    const proofSet = decoded;
    [decoded, o] = new PoliciesCoder(policyTypes).decode(data, o);
    const policies = decoded;
    [decoded, o] = coders.array(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = coders.array(outputCoder, outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = coders.array(witnessCoder, witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Upload,
        root,
        witnessIndex,
        subsectionIndex,
        subsectionsNumber,
        proofSetCount,
        policyTypes,
        inputsCount,
        outputsCount,
        witnessesCount,
        proofSet,
        policies,
        inputs,
        outputs,
        witnesses,
      },
      o,
    ];
  }
}

export type TransactionBlob = BaseTransactionType & {
  type: TransactionType.Blob;

  /** Hash of the bytecode. (b256) */
  blobId: string;

  /** Witness index of contract bytecode (u16) */
  witnessIndex: number;
};

export class TransactionBlobCoder extends Coder<TransactionBlob, TransactionBlob> {
  override type = 'TransactionBlob';

  encode(value: TransactionBlob): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.b256.encode(value.blobId));
    parts.push(coders.u16.encode(value.witnessIndex));
    parts.push(coders.u32.encode(value.policyTypes));
    parts.push(coders.u16.encode(value.inputsCount));
    parts.push(coders.u16.encode(value.outputsCount));
    parts.push(coders.u16.encode(value.witnessesCount));
    parts.push(new PoliciesCoder().encode(value.policies));
    parts.push(coders.array(new InputCoder(), value.inputsCount).encode(value.inputs));
    parts.push(coders.array(outputCoder, value.outputsCount).encode(value.outputs));
    parts.push(coders.array(witnessCoder, value.witnessesCount).encode(value.witnesses));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [TransactionBlob, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.b256.decode(data, o);
    const blobId = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessIndex = decoded;
    [decoded, o] = coders.u32.decode(data, o);
    const policyTypes = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const inputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const outputsCount = decoded;
    [decoded, o] = coders.u16.decode(data, o);
    const witnessesCount = decoded;
    [decoded, o] = new PoliciesCoder(policyTypes).decode(data, o);
    const policies = decoded;
    [decoded, o] = coders.array(new InputCoder(), inputsCount).decode(data, o);
    const inputs = decoded;
    [decoded, o] = coders.array(outputCoder, outputsCount).decode(data, o);
    const outputs = decoded;
    [decoded, o] = coders.array(witnessCoder, witnessesCount).decode(data, o);
    const witnesses = decoded;

    return [
      {
        type: TransactionType.Blob,
        blobId,
        witnessIndex,
        policyTypes,
        inputsCount,
        outputsCount,
        witnessesCount,
        policies,
        inputs,
        outputs,
        witnesses,
      },
      o,
    ];
  }
}

type PossibleTransactions =
  | TransactionScript
  | TransactionCreate
  | TransactionMint
  | TransactionUpgrade
  | TransactionUpload
  | TransactionBlob;

export type Transaction<TTransactionType = void> = TTransactionType extends TransactionType
  ? Extract<PossibleTransactions, { type: TTransactionType }>
  : Partial<Omit<TransactionScript, 'type'>> &
      Partial<Omit<TransactionCreate, 'type'>> &
      Partial<Omit<TransactionMint, 'type'>> &
      Partial<Omit<TransactionUpgrade, 'type'>> &
      Partial<Omit<TransactionUpload, 'type'>> &
      Partial<Omit<TransactionBlob, 'type'>> & {
        type: TransactionType;
      };

export class TransactionCoder extends Coder<Transaction, Transaction> {
  override type = 'Transaction';

  encode(value: Transaction): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u8.encode(value.type));

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
      case TransactionType.Upgrade: {
        parts.push(
          new TransactionUpgradeCoder().encode(value as Transaction<TransactionType.Upgrade>)
        );
        break;
      }
      case TransactionType.Upload: {
        parts.push(
          new TransactionUploadCoder().encode(value as Transaction<TransactionType.Upload>)
        );
        break;
      }
      case TransactionType.Blob: {
        parts.push(new TransactionBlobCoder().encode(value as Transaction<TransactionType.Blob>));
        break;
      }
      default: {
        throw new FuelError(
          ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${type}`
        );
      }
    }

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Transaction, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.u8.decode(data, o);
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
      case TransactionType.Upgrade: {
        [decoded, o] = new TransactionUpgradeCoder().decode(data, o);
        return [decoded, o];
      }
      case TransactionType.Upload: {
        [decoded, o] = new TransactionUploadCoder().decode(data, o);
        return [decoded, o];
      }
      case TransactionType.Blob: {
        [decoded, o] = new TransactionBlobCoder().decode(data, o);
        return [decoded, o];
      }
      default: {
        throw new FuelError(
          ErrorCode.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${type}`
        );
      }
    }
  }
}
