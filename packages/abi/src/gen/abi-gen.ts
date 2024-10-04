import type { BinaryVersions } from '@fuel-ts/versions';

import { getRenderer } from './renderers/getRenderer';
import type { ProgramDetails } from './utils/get-program-details';

export interface AbiGenInput {
  programDetails: ProgramDetails[];
  versions: BinaryVersions;
  mode?: 'ts';
}

export interface AbiGenResult {
  filename: string;
  content: string;
}

export class AbiGen {
  public static generate({ programDetails, mode, versions }: AbiGenInput): AbiGenResult[] {
    const render = getRenderer(mode);
    return render(programDetails, versions);
  }
}
