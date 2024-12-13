import type { AbiGenInput, AbiGenResult } from './abi-gen-types';
import { getRenderer } from './renderers/getRenderer';

export class AbiGen {
  public static generate({ programDetails, mode, versions }: AbiGenInput): AbiGenResult[] {
    const render = getRenderer(mode);
    return render(programDetails, versions);
  }
}
