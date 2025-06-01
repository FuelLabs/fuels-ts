import type { JsonAbiErrorCodes } from './JsonAbi';

export interface IErrorCode {
  errorCode: string;
  errorValue: JsonAbiErrorCodes;
}
