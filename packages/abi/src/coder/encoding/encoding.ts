import type { SupportedCodersV1 } from './encoding-types';
import { v1 } from './v1';

export class AbiEncoding {
  /**
   * Encoding version 1
   *
   * See {@link https://docs.fuel.network/docs/specs/abi/json-abi-format/}
   */
  static v1: SupportedCodersV1 = v1;
}
