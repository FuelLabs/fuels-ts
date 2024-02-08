import type { ResolvedAbiType } from '../resolved-abi-type';

import type { Coder, EncodingOptions } from './coders/abstract-coder';

/**
 * An implementing encoding strategy class should enforce the specifications of a
 * specific fuel encoding version.
 */
export interface EncodingStrategy {
  /**
   * Once a strategy has been specified, this method can be called to obtain a spec
   * adhering coder to encode and decode.
   *
   * @param resolvedAbiType - the resolved type to return a coder for.
   * @param options - options to be utilized during the encoding process.
   */
  getCoder(resolvedAbiType: ResolvedAbiType, options?: EncodingOptions): Coder;
}
