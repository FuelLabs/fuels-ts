import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ENCODING_V0, ENCODING_V1 } from '../../../utils/constants';
import type { TGetCoder } from '../../types/TGetCoder';
import { EncodingStrategyV1 } from '../EncodingStrategyV1';
import { EncodingStrategyV0 } from '../getCoderV0';

/**
 * Retrieves the appropriate encoding strategy for a given encoding version.
 *
 * @param encoding - the version to provide a strategy for.
 * @throws for an unsupported encoding version.
 * @returns the appropriate encoding strategy.
 */
export function getEncodingStrategy(encoding: string = ENCODING_V0): TGetCoder {
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
