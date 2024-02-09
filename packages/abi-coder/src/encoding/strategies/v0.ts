import { ErrorCode, FuelError } from '@fuel-ts/errors';

import {
  B256_CODER_TYPE,
  B512_CODER_TYPE,
  BOOL_CODER_TYPE,
  BYTES_CODER_TYPE,
  OPTION_CODER_TYPE,
  RAW_PTR_CODER_TYPE,
  RAW_SLICE_CODER_TYPE,
  STD_STRING_CODER_TYPE,
  STR_CODER_TYPE,
  U16_CODER_TYPE,
  U32_CODER_TYPE,
  U64_CODER_TYPE,
  U8_CODER_TYPE,
  VEC_CODER_TYPE,
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
} from '../../constants';
import { ResolvedAbiType } from '../../resolved-abi-type';
import { findOrThrow } from '../../utilities';
import type { Coder, EncodingOptions } from '../coders/abstract-coder';
import { ArrayCoder } from '../coders/v0/array';
import { B256Coder } from '../coders/v0/b256';
import { B512Coder } from '../coders/v0/b512';
import { BooleanCoder } from '../coders/v0/boolean';
import { ByteCoder } from '../coders/v0/byte';
import { EnumCoder } from '../coders/v0/enum';
import { NumberCoder } from '../coders/v0/number';
import { OptionCoder } from '../coders/v0/option';
import { RawSliceCoder } from '../coders/v0/raw-slice';
import { StdStringCoder } from '../coders/v0/stdString';
import { StringCoder } from '../coders/v0/string';
import { StructCoder } from '../coders/v0/struct';
import { TupleCoder } from '../coders/v0/tuple';
import { U64Coder } from '../coders/v0/u64';
import { VecCoder } from '../coders/v0/vec';
import type { EncodingStrategy } from '../types';

/**
 * Encoding strategy based on the v0 spec:
 */
export class EncodingStrategyV0 implements EncodingStrategy {
  /**
   * Retrieves coders that adhere to the v0 spec.
   *
   * @param resolvedAbiType - the resolved type to return a coder for.
   * @param options - options to be utilized during the encoding process.
   * @returns the coder for a given type.
   */
  getCoder(resolvedAbiType: ResolvedAbiType, options?: EncodingOptions): Coder {
    switch (resolvedAbiType.type) {
      case U8_CODER_TYPE:
      case U16_CODER_TYPE:
      case U32_CODER_TYPE:
        return new NumberCoder(resolvedAbiType.type, options);
      case U64_CODER_TYPE:
      case RAW_PTR_CODER_TYPE:
        return new U64Coder();
      case RAW_SLICE_CODER_TYPE:
        return new RawSliceCoder();
      case BOOL_CODER_TYPE:
        return new BooleanCoder(options);
      case B256_CODER_TYPE:
        return new B256Coder();
      case B512_CODER_TYPE:
        return new B512Coder();
      case BYTES_CODER_TYPE:
        return new ByteCoder();
      case STD_STRING_CODER_TYPE:
        return new StdStringCoder();
      default:
        break;
    }

    const stringMatch = stringRegEx.exec(resolvedAbiType.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return new StringCoder(length);
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

      const arrayElementCoder = this.getCoder(arg, { isSmallBytes: true });
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

      const itemCoder = this.getCoder(argType, { isSmallBytes: true });
      return new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(resolvedAbiType.type)?.groups;
    if (structMatch) {
      const coders = this.getCoders(components, { isRightPadded: true });
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(resolvedAbiType.type)?.groups;
    if (enumMatch) {
      const coders = this.getCoders(components);

      const isOptionEnum = resolvedAbiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(resolvedAbiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) =>
        this.getCoder(component, { isRightPadded: true })
      );
      return new TupleCoder(coders);
    }

    if (resolvedAbiType.type === STR_CODER_TYPE) {
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

  /**
   * @param components - components to generate coders for.
   * @param options - options to be utilized during the encoding process.
   * @returns the coders for a given set of components.
   */
  private getCoders(components: readonly ResolvedAbiType[], options?: EncodingOptions) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = this.getCoder(component, options);
      return o;
    }, {});
  }
}
