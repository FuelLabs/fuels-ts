// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import type { DecodedValue, InputValue, Coder } from './coders/abstract-coder';
import { ArrayCoder } from './coders/array';
import { B256Coder } from './coders/b256';
import { B512Coder } from './coders/b512';
import { BooleanCoder } from './coders/boolean';
import { ByteCoder } from './coders/byte';
import { EnumCoder } from './coders/enum';
import { NumberCoder } from './coders/number';
import { OptionCoder } from './coders/option';
import { StringCoder } from './coders/string';
import { StructCoder } from './coders/struct';
import { TupleCoder } from './coders/tuple';
import { U64Coder } from './coders/u64';
import { VecCoder } from './coders/vec';
import {
  arrayRegEx,
  enumRegEx,
  stringRegEx,
  structRegEx,
  tupleRegEx,
  OPTION_CODER_TYPE,
  VEC_CODER_TYPE,
} from './constants';
import { ResolvedAbiType } from './resolved-abi-type';
import { findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);
export abstract class AbiCoder {
  static getCoder(abiType: ResolvedAbiType): Coder {
    switch (abiType.type) {
      case 'u8':
      case 'u16':
      case 'u32':
        return new NumberCoder(abiType.type);
      case 'u64':
      case 'raw untyped ptr':
        return new U64Coder();
      case 'bool':
        return new BooleanCoder();
      case 'byte':
        return new ByteCoder();
      case 'b256':
        return new B256Coder();
      case 'struct B512':
        return new B512Coder();
      default:
        break;
    }

    const stringMatch = stringRegEx.exec(abiType.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return new StringCoder(length);
    }

    if (['raw untyped slice'].includes(abiType.type)) {
      const length = 0;
      const itemCoder = new U64Coder();
      return new ArrayCoder(itemCoder, length);
    }

    // ABI types underneath MUST have components by definition
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const components = abiType.components!;

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new Error('Expected array type to have an item component');
      }

      const arrayElementCoder = AbiCoder.getCoder(arg);
      return new ArrayCoder(arrayElementCoder, length);
    }

    if (abiType.type === VEC_CODER_TYPE) {
      const arg = findOrThrow(components, (c) => c.name === 'buf').originalTypeArguments?.[0];
      if (!arg) {
        throw new Error('Expected Vec type to have a type argument');
      }
      const argType = new ResolvedAbiType(abiType.abi, arg);

      const itemCoder = AbiCoder.getCoder(argType);
      return new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(abiType.type)?.groups;
    if (structMatch) {
      const coders = AbiCoder.getCoders(components);
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(abiType.type)?.groups;
    if (enumMatch) {
      const coders = AbiCoder.getCoders(components);

      const isOptionEnum = abiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(abiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) => AbiCoder.getCoder(component));
      return new TupleCoder(coders);
    }

    return logger.throwArgumentError('Coder not found', 'abiType', { abiType });
  }

  private static getCoders(components: readonly ResolvedAbiType[]) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = AbiCoder.getCoder(component);
      return o;
    }, {});
  }

  static encode(abiType: ResolvedAbiType, value: InputValue) {
    return this.getCoder(abiType).encode(value);
  }

  static decode(
    abiType: ResolvedAbiType,
    data: Uint8Array,
    offset: number
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abiType).decode(data, offset) as [DecodedValue | undefined, number];
  }
}
