import { ErrorCode } from '../abi/errors/errorCode';
import type { IErrorCode } from '../types/interfaces/IErrorCode';

export function makeErrorCode(params: IErrorCode) {
  return new ErrorCode(params);
}
