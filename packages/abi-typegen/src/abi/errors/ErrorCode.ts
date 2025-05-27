import type { IErrorCode } from '../../types/interfaces/IErrorCode';

export class ErrorCode {
  public errorCode: string;
  public errorValue: IErrorCode['errorValue'];

  constructor(params: IErrorCode) {
    this.errorCode = params.errorCode;
    this.errorValue = params.errorValue;
  }
}
