
import { getRenderer } from './renderers/getRenderer';
import type { ProgramDetails } from './utils/get-program-details';

export interface AbiGenInput {
  programDetails: ProgramDetails[];
  mode?: 'ts';
}

export interface AbiGenResult {
  filename: string;
  content: string;
}

export class AbiGen {
  public static generate({ programDetails, mode }: AbiGenInput) {
    const render = getRenderer(mode);
    return render(programDetails);
  }
}
