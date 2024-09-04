/* eslint-disable @typescript-eslint/no-misused-new */

import type { ProgramRenderables } from './renderables';

/**
 * Generation
 */
export interface AbiGen {
  new (opts: { inputs: AbiGenInput[]; output: AbiGenOutput }): AbiGen;

  /**
   * Loops over all the inputs and runs the associated
   *
   * @returns
   */
  generate: () => void;
}

export interface AbiGenFile {
  path: string;
  contents: string;
}

/**
 * Contains all the inputs that is passed around
 *
 *
 */
export interface AbiGenInput {
  // Just here for future reference
  abiContents: AbiGenFile;
  binContents?: AbiGenFile;
  storageSlotsContents?: AbiGenFile;

  // TODO: maybe we should delay the loading of the contents + (abi) until we want to use it.
  abi: {
    capitalizedName: string;
  };

  // @param filepath - The path to the ABI output (/out/release,/out/debug)
  new (opts: { dirPathToProgram: string }): AbiGenInput;

  // @static
  // Loads the input from absolute Sway project directory
  // This is just a proxy to the contructor for illustration purposes
  //
  // @param absolutePath - the absolute root of the project
  // /test-contract (root)
  // /test-contract/out/debug
  // /test-contract/out/release
  // /test-contract/src/contract.sw
  // /test-contract/Forc.toml
  fromSwayDir: (absolutePath: string) => AbiGenInput;

  // @static
  // Searches
  fromGlob(pattern: string): AbiGenInput[];
}

export interface AbiGenOutput {
  type: 'ts' | 'js';
  // Do we need to handle different module types (ESM, CJS)?
  // module: 'esm' | 'cjs';

  programRenderables: ProgramRenderables;

  new (): AbiGenOutput;

  /**
   * For the given input, we will grab the program renderables for the ABI program type
   */
  generate: (opts: { input: AbiGenInput; outputDir: string }) => AbiGenFile[];
}

export interface AbiGenRenderable {
  //
  (opts: { input: AbiGenInput }): AbiGenFile[];
}
