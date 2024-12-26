import type { BinaryVersions } from '@fuel-ts/versions';

import type { AbiGenResult, ProgramDetails } from '../abi-gen-types';

export type Renderer = (details: ProgramDetails[], versions: BinaryVersions) => AbiGenResult[];

export type TsAbiGenResult = AbiGenResult & {
  exportInIndexFile?: string[];
};
