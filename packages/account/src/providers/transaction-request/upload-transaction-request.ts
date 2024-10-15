import { ZeroBytes32 } from '@fuel-ts/address/configs';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { type TransactionUpload, TransactionType } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { ChainInfo, GasCosts } from '../provider';
import { calculateMetadataGasForTxUpload, calculateMinGasForTxUpload } from '../utils';

import { hashTransaction } from './hash-transaction';
import { type BaseTransactionRequestLike, BaseTransactionRequest } from './transaction-request';

/**
 * @hidden
 */
export interface UploadSubsectionRequest {
  /** The root of the Merkle tree is created over the bytecode. */
  root: BytesLike;

  /** The index of the subsection of the bytecode. */
  subsectionIndex: number;

  /** The total number of subsections on which bytecode was divided. */
  subsectionsNumber: number;

  /** The proof set helps to verify the connection of the subsection to the `root`. */
  proofSet: BytesLike[];

  /** The subsection bytecode. */
  subsection: BytesLike;
}

/**
 * @hidden
 */
export interface UploadTransactionRequestLike extends BaseTransactionRequestLike {
  /** The witness index of the subsection of the bytecode. */
  witnessIndex?: number;

  /** The subsection data. */
  subsection?: Omit<UploadSubsectionRequest, 'subsection'>;
}

export class UploadTransactionRequest extends BaseTransactionRequest {
  static from(obj: UploadTransactionRequestLike): UploadTransactionRequest {
    if (obj instanceof UploadTransactionRequest) {
      return obj;
    }
    return new this(clone(obj));
  }

  /** Type of the transaction */
  type = TransactionType.Upload as const;
  /** The witness index of the subsection of the bytecode. */
  witnessIndex: number;
  /** The subsection data. */
  subsection: Omit<UploadSubsectionRequest, 'subsection'>;

  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex, subsection, ...rest }: UploadTransactionRequestLike = {}) {
    super(rest);
    this.witnessIndex = witnessIndex ?? 0;
    this.subsection = subsection ?? {
      proofSet: [],
      root: ZeroBytes32,
      subsectionIndex: 0,
      subsectionsNumber: 0,
    };
  }

  /**
   * Adds the subsection.
   *
   * @param subsection - The subsection data.
   */
  addSubsection(subsection: UploadSubsectionRequest) {
    const { subsection: subsectionBytecode, ...rest } = subsection;
    this.subsection = rest;
    this.witnessIndex = this.addWitness(subsectionBytecode);
  }

  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
  }

  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionUpload {
    const baseTransaction = this.getBaseTransaction();
    const { subsectionIndex, subsectionsNumber, root, proofSet } = this.subsection;
    return {
      type: TransactionType.Upload,
      ...baseTransaction,
      subsectionIndex,
      subsectionsNumber,
      root: hexlify(root),
      proofSet: proofSet.map(hexlify),
      witnessIndex: this.witnessIndex,
      proofSetCount: proofSet.length,
    };
  }

  /**
   * Calculates the metadata gas cost for an upload transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upload transaction.
   */
  metadataGas(gasCosts: GasCosts): BN {
    return calculateMetadataGasForTxUpload({
      gasCosts,
      txBytesSize: this.byteSize(),
      subsectionSize: arrayify(this.witnesses[this.witnessIndex]).length,
      subsectionsSize: this.subsection.subsectionsNumber,
    });
  }

  /**
   * Calculates the minimum gas for an upload transaction.
   *
   * @param chainInfo - The chain information.
   *
   * @returns the minimum gas for the upload transaction
   */
  calculateMinGas(chainInfo: ChainInfo): BN {
    const minGas = super.calculateMinGas(chainInfo);
    const { gasCosts } = chainInfo.consensusParameters;
    const bytecode = this.witnesses[this.witnessIndex] ?? ZeroBytes32;
    return calculateMinGasForTxUpload({
      gasCosts,
      baseMinGas: minGas.toNumber(),
      subsectionSize: arrayify(bytecode).length,
    });
  }
}
