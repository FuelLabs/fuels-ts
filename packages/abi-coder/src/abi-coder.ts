// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { DecodedValue, InputValue, Coder, EncodingOptions } from './coders/abstract-coder';
import { createCoder } from './coders/create-coder';
import { ArrayCoder } from './coders/v0/array';
import { EnumCoder } from './coders/v0/enum';
import { OptionCoder } from './coders/v0/option';
import { StringCoder } from './coders/v0/string';
import { StructCoder } from './coders/v0/struct';
import { TupleCoder } from './coders/v0/tuple';
import { VecCoder } from './coders/v0/vec';
import { EnumCoder as EnumCoderV1 } from './coders/v1/enum';
import { StringCoder as StringCoderV1 } from './coders/v1/string';
import { StructCoder as StructCoderV1 } from './coders/v1/struct';
import { TupleCoder as TupleCoderV1 } from './coders/v1/tuple';
import { VecCoder as VecCoderV1 } from './coders/v1/vec';
import {
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
  OPTION_CODER_TYPE,
  VEC_CODER_TYPE,
} from './constants';
import type { JsonAbi, JsonAbiArgument } from './json-abi';
import { ResolvedAbiType } from './resolved-abi-type';
import { findOrThrow } from './utilities';

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

  /**
   * TODO: Refactor into factory
   */
  private static getCoderImpl(
    resolvedAbiType: ResolvedAbiType,
    options: EncodingOptions = {
      isSmallBytes: false,
    }
  ): Coder {
    const { version } = options;

    // TODO: refactor out getCoderIpm;
    try {
      return createCoder(resolvedAbiType, options);
    } catch (error) {
      if (error instanceof FuelError) {
        console.log('FuelError', error);
      }
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
