/* eslint-disable @typescript-eslint/no-misused-new */

/**
 * Generation
 */

export interface AbiGenFile {
  path: string;
  contents: string;
}

export interface AbiGenInput {
  // Just here for future reference
  abiContents: AbiGenFile;
  binContents?: AbiGenFile;
  storageSlotsContents?: AbiGenFile;

  // TODO: maybe we should delay the loading of the contents + (abi) until we want to use it.
  abi: {
    programType: 'contract';
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
  type: 'typescript' | 'javascript';
  // Do we need to handle different module types (ESM, CJS)?
  module: 'esm' | 'cjs';
  outputDir: string;
  fileExtension: 'ts' | 'js';
}

export interface AbiGenRenderable {
  //
  (opts: { input: AbiGenInput; output: AbiGenOutput }): AbiGenFile[];
}
