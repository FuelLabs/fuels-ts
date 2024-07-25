import type { ResolvedType } from '../ResolvedType';
import type { Coder } from '../encoding/coders/AbstractCoder';

import type { EncodingOptions } from './EncodingOptions';

/**
 * A function that can be used to obtain spec adhering coders.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 */
export type GetCoderFn = (resolvedAbiType: ResolvedType, options?: EncodingOptions) => Coder;
