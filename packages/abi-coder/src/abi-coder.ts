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
  genericRegEx,
} from './constants';
import type { JsonAbi, JsonAbiArgument } from './json-abi';
import { findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);

export class AbiCoder {
  private abi: JsonAbi;

  constructor(abi: JsonAbi) {
    this.abi = AbiCoder.resolveImplicitGenerics(abi);
  }

  private static resolveImplicitGenerics(abi: JsonAbi) {
    const clone = structuredClone(abi) as JsonAbi;

    clone.types.forEach((t) => {
      if (Array.isArray(t.typeParameters)) return t;
      if (t.components === null) return t;

      Object.defineProperty(t, 'typeParameters', {
        value: this.getImplicitGenericTypeParameters(clone, t.components),
      });

      return t;
    });

    clone.types.forEach((t) => {
      if (t.components === null) return t;

      const components = t.components.map((c) => AbiCoder.mapGenericArgs(clone, c));

      Object.defineProperty(t, 'components', { value: components });

      return t;
    });

    return clone;
  }

  private static getImplicitGenericTypeParameters(
    abi: JsonAbi,
    args: readonly JsonAbiArgument[],
    implicitGenericParametersParam?: number[]
  ) {
    const implicitGenericParameters: number[] = implicitGenericParametersParam ?? [];

    args.forEach((arg) => {
      const argType = findOrThrow(abi.types, (t) => t.typeId === arg.type);

      const isGeneric = genericRegEx.test(argType.type);

      if (isGeneric) {
        implicitGenericParameters.push(argType.typeId);
        return;
      }

      if (Array.isArray(arg.typeArguments))
        this.getImplicitGenericTypeParameters(abi, arg.typeArguments, implicitGenericParameters);
    });

    return implicitGenericParameters.length > 0 ? implicitGenericParameters : null;
  }

  private static mapGenericArgs(abi: JsonAbi, c: JsonAbiArgument) {
    if (Array.isArray(c.typeArguments)) {
      Object.defineProperty(c, 'typeArguments', {
        value: c.typeArguments.map((ta) => this.mapGenericArgs(abi, ta)),
      });
      return c;
    }
    const componentType = findOrThrow(abi.types, (abiType) => abiType.typeId === c.type);
    if (componentType.typeParameters === null) return c;

    const typeArguments = componentType.typeParameters.map((tp) => ({
      type: tp,
      name: '',
      typeArguments: null,
    }));

    Object.defineProperty(c, 'typeArguments', { value: typeArguments });

    return c;
  }

  private static resolveGenericArgs(
    abi: JsonAbi,
    args: readonly JsonAbiArgument[],
    typeParametersAndArgsMap: Record<number, JsonAbiArgument> | undefined
  ): readonly JsonAbiArgument[] {
    if (typeParametersAndArgsMap === undefined) return args;

    return args.map((arg) => {
      if (typeParametersAndArgsMap[arg.type] !== undefined) {
        return {
          ...typeParametersAndArgsMap[arg.type],
          name: arg.name,
        };
      }

      if (arg.typeArguments !== null) {
        return {
          ...structuredClone(arg),
          typeArguments: this.resolveGenericArgs(abi, arg.typeArguments, typeParametersAndArgsMap),
        };
      }

      return arg;
    });
  }

  resolveGenericComponents(arg: JsonAbiArgument): readonly JsonAbiArgument[] {
    const abiType = findOrThrow(this.abi.types, (t) => t.typeId === arg.type);

    const typeParametersAndArgsMap = abiType.typeParameters?.reduce(
      (obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonAbiArgument> = { ...obj };
        o[typeParameter] = structuredClone(arg.typeArguments?.[typeParameterIndex]);
        return o;
      },
      {} as Record<number, JsonAbiArgument>
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return AbiCoder.resolveGenericArgs(this.abi, abiType.components!, typeParametersAndArgsMap);
  }

  getCoder(argument: JsonAbiArgument): Coder {
    const abiType = findOrThrow(
      this.abi.types,
      (t) => t.typeId === argument.type,
      () =>
        logger.throwArgumentError('Type does not exist in the provided abi', 'type', {
          argument,
          abi: this.abi,
        })
    );

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
    const components = this.resolveGenericComponents(argument);

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new Error('Expected array type to have an item component');
      }

      const arrayElementCoder = this.getCoder(arg);
      return new ArrayCoder(arrayElementCoder, length);
    }

    if (abiType.type === VEC_CODER_TYPE) {
      const typeArgument = components.find((x) => x.name === 'buf')?.typeArguments?.[0];
      if (!typeArgument) {
        throw new Error('Expected Vec type to have a type argument');
      }
      const itemCoder = this.getCoder(typeArgument);
      return new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(abiType.type)?.groups;
    if (structMatch) {
      const coders = this.getCoders(components);
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(abiType.type)?.groups;
    if (enumMatch) {
      const coders = this.getCoders(components);

      const isOptionEnum = abiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(abiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) => this.getCoder(component));
      return new TupleCoder(coders);
    }

    return logger.throwArgumentError('Coder not found', 'abiType', { abiType, abi: this.abi });
  }

  private getCoders(components: readonly JsonAbiArgument[]) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = this.getCoder(component);
      return o;
    }, {});
  }

  encode(argument: JsonAbiArgument, value: InputValue) {
    return this.getCoder(argument).encode(value);
  }

  decode(
    arg: JsonAbiArgument,
    data: Uint8Array,
    offset: number
  ): [DecodedValue | undefined, number] {
    return this.getCoder(arg).decode(data, offset) as [DecodedValue | undefined, number];
  }
}
