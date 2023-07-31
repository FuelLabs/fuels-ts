import { ErrorCode } from './error-codes';

export { ErrorCode } from './error-codes';

export class FuelError extends Error {
  static readonly CODES = ErrorCode;
  static parse(e: unknown) {
    const error = e as FuelError;
    if (error.code === undefined)
      throw new FuelError(ErrorCode.PARSE_FAILED, "missing 'code' property");

    if (!Object.values(ErrorCode).includes(error.code))
      throw new FuelError(
        ErrorCode.PARSE_FAILED,
        `provided code ${
          error.code
        } isn't part of the ErrorCode enum. The possible values are: ${Object.values(
          ErrorCode
        ).join(', ')}.`
      );

    return new FuelError(error.code, error.message);
  }

  code: ErrorCode;
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'FuelError';
  }

  toObject() {
    const { code, name, message } = this;
    return { code, name, message };
  }
}
