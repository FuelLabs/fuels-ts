import { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';

import { coders, createCoder } from './coders';

export enum UpgradePurposeTypeEnum {
  ConsensusParameters = 0,
  StateTransition = 1,
}

export type UpgradePurpose =
  | {
      type: UpgradePurposeTypeEnum.ConsensusParameters;
      data: ConsensusParameters;
    }
  | {
      type: UpgradePurposeTypeEnum.StateTransition;
      data: StateTransition;
    };

export interface ConsensusParameters {
  /** Index of witness that contains a serialized(with postcard) consensus parameters. (u16) */
  witnessIndex: number;

  /** The hash of the serialized consensus parameters. */
  checksum: string;
}

export const consensusParameterCoder = createCoder('ConsensusParameters', {
  witnessIndex: coders.u16,
  checksum: coders.b256,
});

export interface StateTransition {
  /** The root of the new bytecode of the state transition function. */
  bytecodeRoot: string;
}

export const stateTransitionCoder = createCoder('StateTransition', {
  bytecodeRoot: coders.b256,
});

export class UpgradePurposeCoder extends Coder<UpgradePurpose, UpgradePurpose> {
  override type = 'UpgradePurpose';

  encode(upgradePurposeType: UpgradePurpose): Uint8Array {
    const parts: Uint8Array[] = [];
    const { type } = upgradePurposeType;

    parts.push(coders.u8.encode(type));

    switch (type) {
      case UpgradePurposeTypeEnum.ConsensusParameters: {
        parts.push(consensusParameterCoder.encode(upgradePurposeType.data));
        break;
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        parts.push(stateTransitionCoder.encode(upgradePurposeType.data));
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

  decode(data: Uint8Array, initialOffset: number): [UpgradePurpose, number] {
    const [type, offset] = coders.u8.decode(data, initialOffset);

    switch (type) {
      case UpgradePurposeTypeEnum.ConsensusParameters: {
        const [decoded, o] = consensusParameterCoder.decode(data, offset);
        return [{ type, data: decoded }, o];
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        const [decoded, o] = stateTransitionCoder.decode(data, offset);
        return [{ type, data: decoded }, o];
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
