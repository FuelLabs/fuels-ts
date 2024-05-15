import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { GetCoderFn } from '../../types/GetCoder';
import type { EncodingVersion } from '../../utils/constants';
import { ENCODING_V1 } from '../../utils/constants';

import { getCoder as getCoderV1 } from './getCoderV1';

/**
 * Retrieves the appropriate encoding function for a given encoding version.
 *
 * @param encoding - the version to provide a strategy for.
 * @throws for an unsupported encoding version.
 * @returns the appropriate encoding strategy.
 */
export function getCoderForEncoding(encoding: EncodingVersion = ENCODING_V1): GetCoderFn {
  switch (encoding) {
    case ENCODING_V1:
      return getCoderV1;
    default:
      throw new FuelError(
        ErrorCode.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${encoding} is unsupported.`
      );
  }
}
