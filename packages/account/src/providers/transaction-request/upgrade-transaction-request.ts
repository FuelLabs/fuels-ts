import { FuelError } from '@fuel-ts/errors';
import { hash } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import {
  TransactionType,
  type TransactionUpgrade,
  type UpgradePurpose,
  UpgradePurposeTypeEnum,
} from '@fuel-ts/transactions';
import { hexlify } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { GasCosts } from '../provider';
import { calculateMetadataGasForTxUpgrade } from '../utils';

import { hashTransaction } from './hash-transaction';
import { BaseTransactionRequest, type BaseTransactionRequestLike } from './transaction-request';

/**
 * @hidden
 */
export type UpgradePurposeRequest =
  | {
      type: UpgradePurposeTypeEnum.ConsensusParameters;
      checksum: string;
    }
  | {
      type: UpgradePurposeTypeEnum.StateTransition;
      data: BytesLike;
    };

/**
 * @hidden
 */
export interface UpgradeTransactionRequestLike extends BaseTransactionRequestLike {
  /** The upgrade purpose */
  upgradePurpose?: UpgradePurposeRequest;

  /** Witness index */
  bytecodeWitnessIndex?: number;
}

export class UpgradeTransactionRequest extends BaseTransactionRequest {
  static from(obj: UpgradeTransactionRequestLike) {
    if (obj instanceof UpgradeTransactionRequest) {
      return obj;
    }
    return new this(clone(obj));
  }

  /** The type of transaction */
  type = TransactionType.Upgrade as const;
  /** The upgrade purpose */
  upgradePurpose: UpgradePurposeRequest;
  /** Witness index of consensus */
  bytecodeWitnessIndex: number;

  /**
   * Creates an instance `UpgradeTransactionRequest`.
   *
   * @param upgradeTransactionRequestLike - The initial values for the instance
   */
  constructor({
    upgradePurpose,
    bytecodeWitnessIndex,
    ...rest
  }: UpgradeTransactionRequestLike = {}) {
    super(rest);
    this.bytecodeWitnessIndex = bytecodeWitnessIndex ?? 0;
    this.upgradePurpose = upgradePurpose ?? {
      type: UpgradePurposeTypeEnum.ConsensusParameters,
      checksum: '0x',
    };
  }

  /**
   * Adds a consensus parameters upgrade purpose.
   *
   * @param consensus - The consensus bytecode.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addConsensusParametersUpgradePurpose(consensus: BytesLike) {
    this.bytecodeWitnessIndex = this.addWitness(consensus);
    this.upgradePurpose = {
      type: UpgradePurposeTypeEnum.ConsensusParameters,
      checksum: hash(consensus),
    };
    return this;
  }

  /**
   * Adds a state transition upgrade purpose.
   *
   * @param bytecodeRoot - The Merkle root of the state transition.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addStateTransitionUpgradePurpose(bytecodeRoot: BytesLike) {
    this.upgradePurpose = {
      type: UpgradePurposeTypeEnum.StateTransition,
      data: hexlify(bytecodeRoot),
    };
    return this;
  }

  /**
   * Adds an upgrade purpose.
   *
   * @param type - The upgrade purpose type.
   * @param data - The bytecode or merkle root of upgrade purpose
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addUpgradePurpose(type: UpgradePurposeTypeEnum, data: BytesLike) {
    if (type === UpgradePurposeTypeEnum.ConsensusParameters) {
      this.addConsensusParametersUpgradePurpose(data);
    }

    if (type === UpgradePurposeTypeEnum.StateTransition) {
      this.addStateTransitionUpgradePurpose(data);
    }

    return this;
  }

  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction(): TransactionUpgrade {
    let upgradePurpose: UpgradePurpose;

    if (this.upgradePurpose.type === UpgradePurposeTypeEnum.ConsensusParameters) {
      upgradePurpose = {
        type: UpgradePurposeTypeEnum.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum,
        },
      };
    } else if (this.upgradePurpose.type === UpgradePurposeTypeEnum.StateTransition) {
      upgradePurpose = {
        type: UpgradePurposeTypeEnum.StateTransition,
        data: {
          bytecodeRoot: hexlify(this.upgradePurpose.data),
        },
      };
    } else {
      throw new FuelError(FuelError.CODES.NOT_IMPLEMENTED, 'Invalid upgrade purpose');
    }

    return {
      type: TransactionType.Upgrade,
      ...super.getBaseTransaction(),
      upgradePurpose,
    };
  }

  /**
   * Gets the Transaction ID by hashing the transaction
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
  }

  /**
   * Calculates the metadata gas cost for an upgrade transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upgrade transaction.
   */
  metadataGas(gasCosts: GasCosts): BN {
    const txBytesSize = this.byteSize();

    if (this.upgradePurpose.type === UpgradePurposeTypeEnum.ConsensusParameters) {
      const witnessIndex = this.bytecodeWitnessIndex;
      const consensusSize = this.witnesses[witnessIndex].length;
      return calculateMetadataGasForTxUpgrade({
        gasCosts,
        txBytesSize,
        consensusSize,
      });
    }

    if (this.upgradePurpose.type === UpgradePurposeTypeEnum.StateTransition) {
      return calculateMetadataGasForTxUpgrade({
        gasCosts,
        txBytesSize,
      });
    }

    throw new FuelError(FuelError.CODES.NOT_IMPLEMENTED, 'Invalid upgrade purpose');
  }
}
