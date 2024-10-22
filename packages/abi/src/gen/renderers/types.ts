import type { BinaryVersions } from '@fuel-ts/versions';

import type { AbiGenResult } from '../abi-gen';
import type { ProgramDetails } from '../utils/get-program-details';

export type Renderer = (details: ProgramDetails[], versions: BinaryVersions) => AbiGenResult[];

export type TsAbiGenResult = AbiGenResult & {
  programType?: ProgramDetails['abi']['programType'];
  exportInIndexFile?: boolean;
};
