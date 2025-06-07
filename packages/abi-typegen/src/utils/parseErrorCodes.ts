import { ErrorCode } from '../abi/errors/errorCode';
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
    const error = makeErrorCode({ code, value });
    return new ErrorCode(error);
  });

  return errorCodes;
}
