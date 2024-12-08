/* eslint-disable max-classes-per-file */
import { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';

import { coders } from './coders';

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
export class ConsensusParametersCoder extends Coder<ConsensusParameters, ConsensusParameters> {
  private coder = coders.struct({
    witnessIndex: coders.u16,
    checksum: coders.b256,
  });

  override type = 'ConsensusParameters';

  encode(value: ConsensusParameters): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [ConsensusParameters, number] {
    return this.coder.decode(data, offset);
  }
}

export interface StateTransition {
  /** The root of the new bytecode of the state transition function. */
  bytecodeRoot: string;
}

export class StateTransitionCoder extends Coder<StateTransition, StateTransition> {
  private coder = coders.struct({
    bytecodeRoot: coders.b256,
  });

  override type = 'StateTransition';

  encode(value: StateTransition): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [StateTransition, number] {
    return this.coder.decode(data, offset);
  }
}

export class UpgradePurposeCoder extends Coder<UpgradePurpose, UpgradePurpose> {
  override type = 'UpgradePurpose';

  encode(upgradePurposeType: UpgradePurpose): Uint8Array {
    const parts: Uint8Array[] = [];
    const { type } = upgradePurposeType;

    parts.push(coders.u8.encode(type));

    switch (type) {
      case UpgradePurposeTypeEnum.ConsensusParameters: {
        parts.push(new ConsensusParametersCoder().encode(upgradePurposeType.data));
        break;
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        parts.push(new StateTransitionCoder().encode(upgradePurposeType.data));
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
        const [decoded, o] = new ConsensusParametersCoder().decode(data, offset);
        return [{ type, data: decoded }, o];
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        const [decoded, o] = new StateTransitionCoder().decode(data, offset);
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
