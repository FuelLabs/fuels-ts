import type { ResolvedAbiType } from '../../../ResolvedAbiType';
import type { Coder, EncodingOptions } from '../../coders/AbstractCoder';

/**
 * An implementing encoding strategy class should enforce the specifications of a
 * specific fuel encoding version.
 */
export interface IEncodingStrategy {
  /**
   * Once a strategy has been specified, this method can be called to obtain a spec
   * adhering coder to encode and decode.
   *
   * @param resolvedAbiType - the resolved type to return a coder for.
   * @param options - options to be utilized during the encoding process.
   */
  getCoder(resolvedAbiType: ResolvedAbiType, options?: EncodingOptions): Coder;
}
