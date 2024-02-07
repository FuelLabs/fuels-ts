import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ENCODING_V0, ENCODING_V1 } from '../constants';

import { EncodingStrategyV0 } from './strategies/encoding-strategy-v0';
import { EncodingStrategyV1 } from './strategies/encoding-strategy-v1';
import type { EncodingStrategy } from './types';

/**
 * Retrieves the appropriate encoding strategy for a given encoding version.
 *
 * @param encoding - the version to provide a strategy for.
 * @throws for an unsupported encoding version.
 * @returns the appropriate encoding strategy.
 */
export function getEncodingStrategy(encoding: string = ENCODING_V0): EncodingStrategy {
  switch (encoding) {
    case ENCODING_V1:
      return new EncodingStrategyV1();
    case ENCODING_V0:
      return new EncodingStrategyV0();
    default:
      throw new FuelError(
        ErrorCode.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${encoding} is unsupported.`
      );
  }
}
