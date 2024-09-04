import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { type TransactionUpload, TransactionType } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { GqlGasCosts } from '../__generated__/operations';
import { calculateMetadataGasForTxUpload } from '../utils';

import { hashTransaction } from './hash-transaction';
import { type BaseTransactionRequestLike, BaseTransactionRequest } from './transaction-request';

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
    return new UploadTransactionRequest(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Upload as const;

  /** The witness index of the subsection of the bytecode. */
  witnessIndex: number;

  /** The subsection data. */
  subsection: Omit<UploadSubsectionRequest, 'subsection'>;

  constructor({ witnessIndex, subsection, ...rest }: UploadTransactionRequestLike = {}) {
    super(rest);
    this.witnessIndex = witnessIndex ?? 0;
    this.subsection = subsection!;
  }

  addSubsection(subsection: UploadSubsectionRequest) {
    const { subsection: subsectionBytecode, ...rest } = subsection;
    this.subsection = rest;
    this.witnessIndex = this.addWitness(subsectionBytecode);
  }

  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
  }

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

  metadataGas(gasCosts: GqlGasCosts): BN {
    return calculateMetadataGasForTxUpload({
      gasCosts,
      txBytesSize: this.byteSize(),
      subsectionSize: arrayify(this.witnesses[this.witnessIndex]).length,
      subsectionsSize: this.subsection.subsectionsNumber,
    });
  }
}
