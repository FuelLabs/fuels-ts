import { renderContract } from './renderables/contract';
import type { AbiGenFile, AbiGenInput, AbiGenOutput } from './types';

export class AbiGen {
  private static renderables = {
    contract: renderContract,
  } as const;

  /**
   * Loops over all the inputs and runs the associated
   *
   * @returns
   */
  static generate(opts: { inputs: AbiGenInput[]; output: AbiGenOutput }): AbiGenFile[] {
    const { inputs, output } = opts;

    const files: AbiGenFile[] = [];

    for (const input of inputs) {
      const { programType } = input.abi;
      const render = this.renderables[programType];
      if (!render) {
        throw new Error(`Unable to find program type for ${input.abi.programType}`);
      }

      const renderedFiles = render({ input, output });
      files.push(...renderedFiles);
    }

    return files;
  }
}
