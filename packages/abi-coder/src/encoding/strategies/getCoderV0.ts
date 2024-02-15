import type { ResolvedAbiType } from '../../ResolvedAbiType';
import type { TGetCoderFn } from '../../types/IGetCoder';
import type { TEncodingOptions } from '../../types/TEncodingOptions';
import type { Coder } from '../coders/AbstractCoder';
import { BooleanCoder } from '../coders/v1/BooleanCoder';

/**
 * Retrieves coders that adhere to the v0 spec.
 *
 * @param resolvedAbiType - the resolved type to return a coder for.
 * @param options - options to be utilized during the encoding process.
 * @returns the coder for a given type.
 */
export const getCoderV0: TGetCoderFn = (
  _resolvedAbiType: ResolvedAbiType,
  _options?: TEncodingOptions
): Coder => new BooleanCoder();
