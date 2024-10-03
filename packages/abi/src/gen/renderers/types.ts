import type { AbiGenResult } from '../abi-gen';
import type { ProgramDetails } from '../utils/get-program-details';

export type Renderer = (details: ProgramDetails[]) => AbiGenResult[];

export type TsAbiGenResult = AbiGenResult & { exportInIndex?: boolean; extension: 'ts' | 'json' };
