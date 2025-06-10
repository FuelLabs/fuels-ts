import { ErrorCode } from '../abi/errors/ErrorCode';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiErrorCode } from '../types/interfaces/JsonAbi';

import { makeErrorCode } from './makeErrorCodes';

export function parseErrorCodes(params: {
  types: IType[];
  rawErrorCodes?: Record<string, JsonAbiErrorCode>;
}) {
  // const { types, rawErrorCodes } = params;
  const { rawErrorCodes } = params;
  const errorCodes: ErrorCode[] = Object.entries(rawErrorCodes ?? {}).map(([code, value]) => {
    return makeErrorCode({ code, value });
  });

  return errorCodes;
}
