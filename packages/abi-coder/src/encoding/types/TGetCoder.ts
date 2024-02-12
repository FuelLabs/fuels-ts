import type { ResolvedAbiType } from '../../ResolvedAbiType';

import type { ICoder } from './ICoder';
import type { TEncodingOptions } from './TEncodingOptions';

/**
 * Once a strategy has been specified, this method can be called to obtain a spec
 * adhering coder to encode and decode.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 */
export type TGetCoder = (resolvedAbiType: ResolvedAbiType, options?: TEncodingOptions) => ICoder;
