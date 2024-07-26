import type { ResolvedType } from './ResolvedType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { getCoderForEncoding } from './encoding/strategies/getCoderForEncoding';
import type { EncodingOptions } from './types/EncodingOptions';

export abstract class AbiCoder {
  static getCoder(
    type: ResolvedType,
    options: EncodingOptions = {
      padToWordSize: false,
    }
  ): Coder {
    return getCoderForEncoding(options.encoding)(type, options);
  }

  static encode(type: ResolvedType, value: InputValue, options?: EncodingOptions) {
    return this.getCoder(type, options).encode(value);
  }

  static decode(
    type: ResolvedType,
    data: Uint8Array,
    offset: number,
    options?: EncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(type, options).decode(data, offset) as [DecodedValue | undefined, number];
  }
}
