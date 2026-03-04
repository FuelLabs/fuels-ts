import type { IErrorCode } from '../../types/interfaces/IErrorCode';

export class ErrorCode {
  public code: string;
  public value: IErrorCode['value'];

  constructor(params: IErrorCode) {
    this.code = params.code;
    this.value = params.value;
  }
}
