import type { AbiGenInput, AbiGenResult } from './abi-gen-types';
import { getRenderer } from './renderers/getRenderer';

/**
 * The main class to generate files for given sway programs.
 * These contents of these generated files make it easier to interact
 * with the sway programs, because type definitions are added,
 * as well as some automatic loading is done for the user.
 */
export class AbiGen {
  /**
   * @returns an array of generated files for the given program details.
   * They can be saved to disk as-is or further processed.
   */
  public static generate({ programDetails, mode, versions }: AbiGenInput): AbiGenResult[] {
    const render = getRenderer(mode);
    return render(programDetails, versions);
  }
}
