import { ErrorCode } from '../abi/errors/errorCode';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiErrorCodes } from '../types/interfaces/JsonAbi';

import { makeErrorCode } from './makeErrorCodes';

export function parseErrorCodes(params: {
  types: IType[];
  rawErrorCodes?: Record<string, JsonAbiErrorCodes>;
}) {
  // const { types, rawErrorCodes } = params;
  const { rawErrorCodes } = params;
  const errorCodes: ErrorCode[] = Object.entries(rawErrorCodes ?? {}).map(
    ([errorCode, errorValue]) => {
      const error = makeErrorCode({ errorCode, errorValue });
      return new ErrorCode(error);
    }
  );

  return errorCodes;
}
