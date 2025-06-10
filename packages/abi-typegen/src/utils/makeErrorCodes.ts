import { ErrorCode } from '../abi/errors/ErrorCode';
import type { IErrorCode } from '../types/interfaces/IErrorCode';

export function makeErrorCode(params: IErrorCode) {
  return new ErrorCode(params);
}
