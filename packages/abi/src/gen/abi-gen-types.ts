import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../parser';

export interface AbiGenInput {
  /**
   * The details of the program to generate the files for.
   */
  programDetails: ProgramDetails[];
  /**
   * The versions of the binaries used to generate the files.
   */
  versions: BinaryVersions;
  /**
   * The mode to generate the files in.
   * Defaults to 'ts' which generates typescript files.
   */
  mode?: 'ts';
}

export interface AbiGenResult {
  /**
   * The filename of the generated file.
   */
  filename: string;
  /**
   * The content of the generated file.
   */
  content: string;
}

export interface ProgramDetails {
  /**
   * The name of the program to generate files for.
   * This will be used to name the generated files,
   * as well as throughout the generated code.
   */
  name: string;
  /**
   * The compressed bytecode of the program in base64 format.
   */
  binCompressed?: string;
  /**
   * The abi of the program in the format returned via `AbiParser`.
   */
  abi: Abi;
  /**
   * The original abi contents in string format.
   */
  abiContents: string;
  /**
   * The storage slots, if working with a contract.
   */
  storageSlots?: string;
}
