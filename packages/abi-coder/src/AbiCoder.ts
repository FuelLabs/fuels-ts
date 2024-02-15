// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { ResolvedAbiType } from './ResolvedAbiType';
import type { DecodedValue, InputValue, Coder, EncodingOptions } from './coders/AbstractCoder';
import { ArrayCoder } from './coders/v0/ArrayCoder';
import { B256Coder } from './coders/v0/B256Coder';
import { B512Coder } from './coders/v0/B512Coder';
import { BooleanCoder } from './coders/v0/BooleanCoder';
import { ByteCoder } from './coders/v0/ByteCoder';
import { EnumCoder } from './coders/v0/EnumCoder';
import { NumberCoder } from './coders/v0/NumberCoder';
import { OptionCoder } from './coders/v0/OptionCoder';
import { RawSliceCoder } from './coders/v0/RawSliceCoder';
import { StdStringCoder } from './coders/v0/StdStringCoder';
import { StringCoder } from './coders/v0/StringCoder';
import { StructCoder } from './coders/v0/StructCoder';
import { TupleCoder } from './coders/v0/TupleCoder';
import { U64Coder } from './coders/v0/U64Coder';
import { VecCoder } from './coders/v0/VecCoder';
import { BooleanCoder as BooleanCoderV1 } from './coders/v1/BooleanCoder';
import { ByteCoder as ByteCoderV1 } from './coders/v1/ByteCoder';
import { EnumCoder as EnumCoderV1 } from './coders/v1/EnumCoder';
import { NumberCoder as NumberCoderV1 } from './coders/v1/NumberCoder';
import { RawSliceCoder as RawSliceCoderV1 } from './coders/v1/RawSliceCoder';
import { StdStringCoder as StdStringCoderV1 } from './coders/v1/StdStringCoder';
import { StringCoder as StringCoderV1 } from './coders/v1/StringCoder';
import { StructCoder as StructCoderV1 } from './coders/v1/StructCoder';
import { TupleCoder as TupleCoderV1 } from './coders/v1/TupleCoder';
import { VecCoder as VecCoderV1 } from './coders/v1/VecCoder';
import type { JsonAbi, JsonAbiArgument } from './types/JsonAbi';
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
    options: EncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const resolvedAbiType = new ResolvedAbiType(abi, argument);

    return AbiCoder.getCoderImpl(resolvedAbiType, options);
  }

  static encode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    value: InputValue,
    options?: EncodingOptions
  ) {
    return this.getCoder(abi, argument, options).encode(value);
  }

  static decode(
    abi: JsonAbi,
    argument: JsonAbiArgument,
    data: Uint8Array,
    offset: number,
    options?: EncodingOptions
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, argument, options).decode(data, offset) as [
      DecodedValue | undefined,
      number,
    ];
  }

  private static getCoderImpl(
    resolvedAbiType: ResolvedAbiType,
    options: EncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const { version } = options;

    switch (resolvedAbiType.type) {
      case 'u8':
      case 'u16':
      case 'u32':
        return version
          ? new NumberCoderV1(resolvedAbiType.type)
          : new NumberCoder(resolvedAbiType.type, options);
      case 'u64':
      case 'raw untyped ptr':
        return new U64Coder();
      case 'raw untyped slice':
        return version ? new RawSliceCoderV1() : new RawSliceCoder();
      case 'bool':
        return version ? new BooleanCoderV1() : new BooleanCoder(options);
      case 'b256':
        return new B256Coder();
      case 'struct B512':
        return new B512Coder();
      case BYTES_CODER_TYPE:
        return version ? new ByteCoderV1() : new ByteCoder();
      case STD_STRING_CODER_TYPE:
        return version ? new StdStringCoderV1() : new StdStringCoder();
      default:
        break;
    }

    const stringMatch = stringRegEx.exec(resolvedAbiType.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return version ? new StringCoderV1(length) : new StringCoder(length);
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

      const arrayElementCoder = AbiCoder.getCoderImpl(arg, { version, isSmallBytes: true });
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

      const itemCoder = AbiCoder.getCoderImpl(argType, { version, isSmallBytes: true });
      return version ? new VecCoderV1(itemCoder) : new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(resolvedAbiType.type)?.groups;
    if (structMatch) {
      const coders = AbiCoder.getCoders(components, { version, isRightPadded: true });
      return version
        ? new StructCoderV1(structMatch.name, coders)
        : new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(resolvedAbiType.type)?.groups;
    if (enumMatch) {
      const coders = AbiCoder.getCoders(components, { version });

      const isOptionEnum = resolvedAbiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return version
        ? new EnumCoderV1(enumMatch.name, coders)
        : new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(resolvedAbiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) =>
        AbiCoder.getCoderImpl(component, { version, isRightPadded: true })
      );
      return version ? new TupleCoderV1(coders) : new TupleCoder(coders);
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

  private static getCoders(components: readonly ResolvedAbiType[], options: EncodingOptions) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = AbiCoder.getCoderImpl(component, options);
      return o;
    }, {});
  }
}
