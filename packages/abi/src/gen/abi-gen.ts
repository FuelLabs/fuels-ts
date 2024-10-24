import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../parser';

import { getRenderer } from './renderers/getRenderer';

export interface AbiGenInput {
  programDetails: ProgramDetails[];
  versions: BinaryVersions;
  mode?: 'ts';
}

export interface AbiGenResult {
  filename: string;
  content: string;
}

export interface ProgramDetails {
  name: string;
  binCompressed: string;
  abi: Abi;
  abiContents: string;
  storageSlots?: string;
}

export class AbiGen {
  public static generate({ programDetails, mode, versions }: AbiGenInput): AbiGenResult[] {
    const render = getRenderer(mode);
    return render(programDetails, versions);
  }
}
