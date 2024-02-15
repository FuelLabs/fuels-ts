import type { ResolvedAbiType } from '../ResolvedAbiType';
import type { Coder } from '../encoding/coders/AbstractCoder';

import type { TEncodingOptions } from './TEncodingOptions';

/**
 * A function that can be used to obtain spec adhering coders.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 */
export type TGetCoderFn = (resolvedAbiType: ResolvedAbiType, options?: TEncodingOptions) => Coder;

/**
 * An interface that contains a function that obtains coders
 */
export interface IGetCoder {
  getCoder: TGetCoderFn;
}
