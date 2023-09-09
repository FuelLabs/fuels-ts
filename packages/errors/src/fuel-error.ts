import { versions } from '@fuel-ts/versions';

import { ErrorCode } from './error-codes';

export class FuelError extends Error {
  static readonly CODES = ErrorCode;
  readonly VERSIONS = versions;

  static parse(e: unknown) {
    const error = e as FuelError;

    if (error.code === undefined) {
      throw new FuelError(
        ErrorCode.PARSE_FAILED,
        "Failed to parse the error object. The required 'code' property is missing."
      );
    }

    const enumValues = Object.values(ErrorCode);
    const codeIsKnown = enumValues.includes(error.code);

    if (!codeIsKnown) {
      throw new FuelError(
        ErrorCode.PARSE_FAILED,
        `Received an unknown error code: ${error.code}. Accepted codes: ${enumValues.join(', ')}.`
      );
    }

    return new FuelError(error.code, error.message);
  }

  code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'FuelError';
  }

  toObject() {
    const { code, name, message, VERSIONS } = this;
    return { code, name, message, VERSIONS };
  }
}
