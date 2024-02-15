// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder } from './encoding/coders/AbstractCoder';
import { ArrayCoder } from './encoding/coders/v0/ArrayCoder';
import { B256Coder } from './encoding/coders/v0/B256Coder';
import { B512Coder } from './encoding/coders/v0/B512Coder';
import { BooleanCoder } from './encoding/coders/v0/BooleanCoder';
import { ByteCoder } from './encoding/coders/v0/ByteCoder';
import { EnumCoder } from './encoding/coders/v0/EnumCoder';
import { NumberCoder } from './encoding/coders/v0/NumberCoder';
import { OptionCoder } from './encoding/coders/v0/OptionCoder';
import { RawSliceCoder } from './encoding/coders/v0/RawSliceCoder';
import { StdStringCoder } from './encoding/coders/v0/StdStringCoder';
import { StringCoder } from './encoding/coders/v0/StringCoder';
import { StructCoder } from './encoding/coders/v0/StructCoder';
import { TupleCoder } from './encoding/coders/v0/TupleCoder';
import { U64Coder } from './encoding/coders/v0/U64Coder';
import { VecCoder } from './encoding/coders/v0/VecCoder';
import { BooleanCoder as BooleanCoderV1 } from './encoding/coders/v1/BooleanCoder';
import { ByteCoder as ByteCoderV1 } from './encoding/coders/v1/ByteCoder';
import { EnumCoder as EnumCoderV1 } from './encoding/coders/v1/EnumCoder';
import { NumberCoder as NumberCoderV1 } from './encoding/coders/v1/NumberCoder';
import { RawSliceCoder as RawSliceCoderV1 } from './encoding/coders/v1/RawSliceCoder';
import { StdStringCoder as StdStringCoderV1 } from './encoding/coders/v1/StdStringCoder';
import { StringCoder as StringCoderV1 } from './encoding/coders/v1/StringCoder';
import { StructCoder as StructCoderV1 } from './encoding/coders/v1/StructCoder';
import { TupleCoder as TupleCoderV1 } from './encoding/coders/v1/TupleCoder';
import { VecCoder as VecCoderV1 } from './encoding/coders/v1/VecCoder';
import { getEncodingStrategy } from './encoding/strategies/getEncodingStrategy';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';
import type { TEncodingOptions } from './types/TEncodingOptions';
import {
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
  OPTION_CODER_TYPE,
  VEC_CODER_TYPE,
  BYTES_CODER_TYPE,
  STD_STRING_CODER_TYPE,
} from './utils/constants';
import { findOrThrow } from './utils/utilities';

export abstract class AbiCoder {
  static getCoder(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    options: TEncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);
    return getEncodingStrategy(options.encoding).getCoder(resolvedAbiType, options);
  }

  static encode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    value: InputValue,
    options?: TEncodingOptions
  ) {
    return this.getCoder(abi, argument, options).encode(value);
  }

  static decode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    data: Uint8Array,
    offset: number,
    options?: TEncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, argument, options).decode(data, offset) as [
      DecodedValue | undefined,
      number,
    ];
  }

  private static getCoderImpl(
    resolvedAbiType: ResolvedAbiType,
    options: TEncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const { encoding } = options;

    switch (resolvedAbiType.type) {
      case 'u8':
      case 'u16':
      case 'u32':
        return encoding
          ? new NumberCoderV1(resolvedAbiType.type)
          : new NumberCoder(resolvedAbiType.type, options);
      case 'u64':
      case 'raw untyped ptr':
        return new U64Coder();
      case 'raw untyped slice':
        return encoding ? new RawSliceCoderV1() : new RawSliceCoder();
      case 'bool':
        return encoding ? new BooleanCoderV1() : new BooleanCoder(options);
      case 'b256':
        return new B256Coder();
      case 'struct B512':
        return new B512Coder();
      case BYTES_CODER_TYPE:
        return encoding ? new ByteCoderV1() : new ByteCoder();
      case STD_STRING_CODER_TYPE:
        return encoding ? new StdStringCoderV1() : new StdStringCoder();
      default:
        break;
    }

    const stringMatch = stringRegEx.exec(resolvedAbiType.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return encoding ? new StringCoderV1(length) : new StringCoder(length);
    }

    // ABI types underneath MUST have components by definition

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const components = resolvedAbiType.components!;

    const arrayMatch = arrayRegEx.exec(resolvedAbiType.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new FuelError(
          ErrorCode.INVALID_COMPONENT,
          `The provided Array type is missing an item of 'component'.`
        );
      }

      const arrayElementCoder = AbiCoder.getCoderImpl(arg, { encoding, isSmallBytes: true });
      return new ArrayCoder(arrayElementCoder, length);
    }

    if (resolvedAbiType.type === VEC_CODER_TYPE) {
      const arg = findOrThrow(components, (c) => c.name === 'buf').originalTypeArguments?.[0];
      if (!arg) {
        throw new FuelError(
          ErrorCode.INVALID_COMPONENT,
          `The provided Vec type is missing the 'type argument'.`
        );
      }
      const argType = new ResolvedAbiType(resolvedAbiType.abi, arg);

      const itemCoder = AbiCoder.getCoderImpl(argType, { encoding, isSmallBytes: true });
      return encoding ? new VecCoderV1(itemCoder) : new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(resolvedAbiType.type)?.groups;
    if (structMatch) {
      const coders = AbiCoder.getCoders(components, { encoding, isRightPadded: true });
      return encoding
        ? new StructCoderV1(structMatch.name, coders)
        : new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(resolvedAbiType.type)?.groups;
    if (enumMatch) {
      const coders = AbiCoder.getCoders(components, { encoding });

      const isOptionEnum = resolvedAbiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return encoding
        ? new EnumCoderV1(enumMatch.name, coders)
        : new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(resolvedAbiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) =>
        AbiCoder.getCoderImpl(component, { encoding, isRightPadded: true })
      );
      return encoding ? new TupleCoderV1(coders) : new TupleCoder(coders);
    }

    if (resolvedAbiType.type === 'str') {
      throw new FuelError(
        ErrorCode.INVALID_DATA,
        'String slices can not be decoded from logs. Convert the slice to `str[N]` with `__to_str_array`'
      );
    }

    throw new FuelError(
      ErrorCode.CODER_NOT_FOUND,
      `Coder not found: ${JSON.stringify(resolvedAbiType)}.`
    );
  }

  private static getCoders(components: readonly ResolvedAbiType[], options: TEncodingOptions) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = AbiCoder.getCoderImpl(component, options);
      return o;
    }, {});
  }
}
