import { ZeroBytes32 } from '@fuel-ts/address/configs';
import type { BytesLike } from '@fuel-ts/interfaces';
import { bn, type BN } from '@fuel-ts/math';
import type { TransactionCreate } from '@fuel-ts/transactions';
import { TransactionType, OutputType } from '@fuel-ts/transactions';
import { arrayify, hexlify } from '@fuel-ts/utils';

import type { GqlGasCosts } from '../__generated__/operations';
import { calculateMetadataGasForTxCreate } from '../utils/gas';

import { hashTransaction } from './hash-transaction';
import type { ContractCreatedTransactionRequestOutput } from './output';
import type { TransactionRequestStorageSlot } from './storage-slot';
import { storageSlotify } from './storage-slot';
import { BaseTransactionRequest } from './transaction-request';
import type { BaseTransactionRequestLike } from './transaction-request';

/**
 * @hidden
 */
export interface CreateTransactionRequestLike extends BaseTransactionRequestLike {
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex?: number;
  /** Salt */
  salt?: BytesLike;
  /** List of storage slots to initialize */
  storageSlots?: TransactionRequestStorageSlot[];
}

/**
 * `CreateTransactionRequest` provides functionalities for creating a transaction request that creates a contract.
 */
export class CreateTransactionRequest extends BaseTransactionRequest {
  static from(obj: CreateTransactionRequestLike) {
    if (obj instanceof this) {
      return structuredClone(obj);
    }
    return structuredClone(obj);
  }

  /** Type of the transaction */
  type = TransactionType.Create as const;
  /** Witness index of contract bytecode to create */
  bytecodeWitnessIndex: number;
  /** Salt */
  salt: string;
  /** List of storage slots to initialize */
  storageSlots: TransactionRequestStorageSlot[];

  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex, salt, storageSlots, ...rest }: CreateTransactionRequestLike) {
    super(rest);
    this.bytecodeWitnessIndex = bytecodeWitnessIndex ?? 0;
    this.salt = hexlify(salt ?? ZeroBytes32);
    this.storageSlots = [...(storageSlots ?? [])];
  }

  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionCreate {
    const baseTransaction = this.getBaseTransaction();
    const bytecodeWitnessIndex = this.bytecodeWitnessIndex;
    const storageSlots = this.storageSlots?.map(storageSlotify) ?? [];
    return {
      type: TransactionType.Create,
      ...baseTransaction,
      bytecodeWitnessIndex,
      storageSlotsCount: bn(storageSlots.length),
      salt: this.salt ? hexlify(this.salt) : ZeroBytes32,
      storageSlots,
    };
  }

  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs(): ContractCreatedTransactionRequestOutput[] {
    return this.outputs.filter(
      (output): output is ContractCreatedTransactionRequestOutput =>
        output.type === OutputType.ContractCreated
    );
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
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(
    /** Contract ID */
    contractId: BytesLike,
    /** State Root */
    stateRoot: BytesLike
  ) {
    this.pushOutput({
      type: OutputType.ContractCreated,
      contractId,
      stateRoot,
    });
  }

  metadataGas(gasCosts: GqlGasCosts): BN {
    return calculateMetadataGasForTxCreate({
      contractBytesSize: bn(arrayify(this.witnesses[this.bytecodeWitnessIndex] || '0x').length),
      gasCosts,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize(),
    });
  }
}
