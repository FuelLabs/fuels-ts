import { B256Coder, Coder, NumberCoder } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';

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

export interface StateTransition {
  /** The root of the new bytecode of the state transition function. */
  bytecodeRoot: string;
}

export class UpgradePurposeCoder extends Coder<UpgradePurpose, UpgradePurpose> {
  constructor() {
    super('UpgradePurpose', 'UpgradePurpose', 0);
  }

  encode(upgradePurposeType: UpgradePurpose): Uint8Array {
    const parts: Uint8Array[] = [];
    const { type } = upgradePurposeType;

    parts.push(new NumberCoder('u8', { padToWordSize: true }).encode(type));

    switch (type) {
      case UpgradePurposeTypeEnum.ConsensusParameters: {
        const data = upgradePurposeType.data as ConsensusParameters;

        parts.push(new NumberCoder('u16', { padToWordSize: true }).encode(data.witnessIndex));
        parts.push(new B256Coder().encode(data.checksum));
        break;
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        const data = upgradePurposeType.data as StateTransition;

        parts.push(new B256Coder().encode(data.bytecodeRoot));
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

  decode(data: Uint8Array, offset: number): [UpgradePurpose, number] {
    let o = offset;
    let decoded;

    [decoded, o] = new NumberCoder('u8', { padToWordSize: true }).decode(data, o);
    const type = decoded as UpgradePurposeTypeEnum;

    switch (type) {
      case UpgradePurposeTypeEnum.ConsensusParameters: {
        [decoded, o] = new NumberCoder('u16', { padToWordSize: true }).decode(data, o);
        const witnessIndex = decoded;
        [decoded, o] = new B256Coder().decode(data, o);
        const checksum = decoded;

        return [{ type, data: { witnessIndex, checksum } }, o];
      }

      case UpgradePurposeTypeEnum.StateTransition: {
        [decoded, o] = new B256Coder().decode(data, o);
        const bytecodeRoot = decoded;

        return [{ type, data: { bytecodeRoot } }, o];
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
