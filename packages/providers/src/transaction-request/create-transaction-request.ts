import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn, type BN } from '@fuel-ts/math';
import type { TransactionCreate } from '@fuel-ts/transactions';
import { TransactionType, OutputType } from '@fuel-ts/transactions';
import { getBytesCopy, hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

import type { GqlGasCosts } from '../__generated__/operations';
import { resolveGasDependentCosts } from '../utils/gas';

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
      return obj;
    }
    return new this(obj);
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
  constructor({
    bytecodeWitnessIndex,
    salt,
    storageSlots,
    ...rest
  }: CreateTransactionRequestLike = {}) {
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
      bytecodeLength: baseTransaction.witnesses[bytecodeWitnessIndex].dataLength / 4,
      bytecodeWitnessIndex,
      storageSlotsCount: storageSlots.length,
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
    const { bytecodeWitnessIndex, witnesses } = this;
    const contractBytesSize = bn(getBytesCopy(witnesses[bytecodeWitnessIndex] || '0x').length);
    const contractRootGas = resolveGasDependentCosts(contractBytesSize, gasCosts.contractRoot);
    const stateRootSize = this.storageSlots.length;
    const stateRootGas = resolveGasDependentCosts(stateRootSize, gasCosts.stateRoot);
    const txIdGas = resolveGasDependentCosts(this.byteSize(), gasCosts.s256);
    // See https://github.com/FuelLabs/fuel-specs/blob/master/src/identifiers/contract-id.md
    const contractIdInputSize = bn(4 + 32 + 32 + 32);
    const contractIdGas = resolveGasDependentCosts(contractIdInputSize, gasCosts.s256);
    const metadataGas = contractRootGas.add(stateRootGas).add(txIdGas).add(contractIdGas);
    return metadataGas.maxU64();
  }
}
