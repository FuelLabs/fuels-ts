import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import { ErrorCode } from './error-codes';

export { ErrorCode as ErrorCodes } from './error-codes';
const logger = new Logger(versions.FUELS);

export class FuelError extends Error {
  static readonly CODES = ErrorCode;
  static parse(e: unknown) {
    return e as FuelError;
  }

  code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
  }

  static logger() {
    logge;
  }
}
