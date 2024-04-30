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
