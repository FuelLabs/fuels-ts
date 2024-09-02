import { FuelError } from '@fuel-ts/errors';
import { hash } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import {
  type TransactionUpgrade,
  type UpgradePurpose,
  TransactionType,
  UpgradePurposeTypeEnum,
} from '@fuel-ts/transactions';
import { hexlify } from '@fuel-ts/utils';

import type { GqlGasCosts } from '../__generated__/operations';
import { calculateMetadataGasForTxUpgrade } from '../utils';

import { hashTransaction } from './hash-transaction';
import { BaseTransactionRequest, type BaseTransactionRequestLike } from './transaction-request';

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
  upgradePurpose?: UpgradePurposeRequest;

  /** Witness index */
  bytecodeWitnessIndex?: number;
}

export class UpgradeTransactionRequest extends BaseTransactionRequest {
  static from(obj: UpgradeTransactionRequestLike) {
    if (obj instanceof UpgradeTransactionRequest) {
      return obj;
    }
    return new UpgradeTransactionRequest(obj);
  }

  /** The type of transaction. */
  type = TransactionType.Upgrade as const;

  /** The upgrade purpose. */
  upgradePurpose: UpgradePurposeRequest;

  /** Witness index */
  bytecodeWitnessIndex: number;

  constructor({
    upgradePurpose,
    bytecodeWitnessIndex,
    ...rest
  }: UpgradeTransactionRequestLike = {}) {
    super(rest);
    this.upgradePurpose = upgradePurpose!;
    this.bytecodeWitnessIndex = bytecodeWitnessIndex ?? 0;
  }

  addConsensusParametersUpgradePurpose(consensus: BytesLike) {
    this.bytecodeWitnessIndex = this.addWitness(consensus);
    this.upgradePurpose = {
      type: UpgradePurposeTypeEnum.ConsensusParameters,
      checksum: hash(consensus),
    };
    return this;
  }

  addStateTransitionUpgradePurpose(bytecodeRoot: BytesLike) {
    this.upgradePurpose = {
      type: UpgradePurposeTypeEnum.StateTransition,
      data: hexlify(bytecodeRoot),
    };
    return this;
  }

  addUpgradePurpose(type: UpgradePurposeTypeEnum, data: BytesLike) {
    if (type === UpgradePurposeTypeEnum.ConsensusParameters) {
      this.addConsensusParametersUpgradePurpose(data);
    }

    if (type === UpgradePurposeTypeEnum.StateTransition) {
      this.addStateTransitionUpgradePurpose(data);
    }

    return this;
  }

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
      throw new FuelError(FuelError.CODES.NOT_IMPLEMENTED, 'Not implemented');
    }

    return {
      ...super.getBaseTransaction(),
      upgradePurpose,
      type: TransactionType.Upgrade,
    };
  }

  getTransactionId(chainId: number): string {
    return hashTransaction(this, chainId);
  }

  metadataGas(gasCosts: GqlGasCosts): BN {
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

    throw new FuelError(FuelError.CODES.NOT_IMPLEMENTED, 'Not implemented');
  }
}
