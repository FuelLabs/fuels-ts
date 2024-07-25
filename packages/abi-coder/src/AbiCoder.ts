import type { ResolvableMetadataType } from './ResolvableMetadataType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { getCoderForEncoding } from './encoding/strategies/getCoderForEncoding';
import { makeResolvedType } from './makeResolvedType';
import type { EncodingOptions } from './types/EncodingOptions';
import type { JsonAbi } from './types/JsonAbi';

export abstract class AbiCoder {
  static getCoder(
    abi: JsonAbi,
    resolvableMetadataTypes: ResolvableMetadataType[],
    concreteTypeId: string,
    options: EncodingOptions = {
      padToWordSize: false,
    }
  ): Coder {
    const resolved = makeResolvedType(abi, resolvableMetadataTypes, concreteTypeId);

    return getCoderForEncoding(options.encoding)(resolved, options);
  }

  static encode(
    abi: JsonAbi,
    resolvableMetadataTypes: ResolvableMetadataType[],
    concreteTypeId: string,
    value: InputValue,
    options?: EncodingOptions
  ) {
    return this.getCoder(abi, resolvableMetadataTypes, concreteTypeId, options).encode(value);
  }

  static decode(
    abi: JsonAbi,
    resolvableMetadataTypes: ResolvableMetadataType[],
    concreteTypeId: string,
    data: Uint8Array,
    offset: number,
    options?: EncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, resolvableMetadataTypes, concreteTypeId, options).decode(
      data,
      offset
    ) as [DecodedValue | undefined, number];
  }
}
