// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { Logger } from '@ethersproject/logger';
import { FuelError } from '@fuel-ts/errors';
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
import type { JsonAbi, JsonAbiArgument, JsonAbiType } from './json-abi';
import { findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);

export abstract class AbiCoder {
  private static getImplicitGenericTypeParameters(
    abi: JsonAbi,
    abiType: JsonAbiType,
    implicitGenericParametersParam: number[] | undefined = undefined
  ): number[] {
    const isExplicitGeneric = abiType.typeParameters !== null;
    if (isExplicitGeneric || abiType.components === null) return [];

    const implicitGenericParameters: number[] = implicitGenericParametersParam ?? [];

    abiType.components.forEach((component) => {
      const componentType = findOrThrow(abi.types, (t) => t.typeId === component.type);

      const isGeneric = genericRegEx.test(componentType.type);

      if (isGeneric) {
        implicitGenericParameters.push(componentType.typeId);
        return;
      }

      this.getImplicitGenericTypeParameters(abi, componentType, implicitGenericParameters);
    });

    return implicitGenericParameters;
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

      const abiType = findOrThrow(abi.types, (x) => x.typeId === arg.type);
      if (abiType.components === null) return arg;
      const implicitGenericTypeParameters = this.getImplicitGenericTypeParameters(abi, abiType);
      if (implicitGenericTypeParameters.length === 0) return arg;

      return {
        ...structuredClone(arg),
        typeArguments: implicitGenericTypeParameters.map((tp) => typeParametersAndArgsMap[tp]),
      };
    });
  }

  static resolveGenericComponents(abi: JsonAbi, arg: JsonAbiArgument): readonly JsonAbiArgument[] {
    let abiType = findOrThrow(abi.types, (t) => t.typeId === arg.type);

    const implicitGenericTypeParameters = this.getImplicitGenericTypeParameters(abi, abiType);
    if (implicitGenericTypeParameters.length > 0) {
      abiType = { ...structuredClone(abiType), typeParameters: implicitGenericTypeParameters };
    }

    const typeParametersAndArgsMap = abiType.typeParameters?.reduce(
      (obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonAbiArgument> = { ...obj };
        o[typeParameter] = structuredClone(arg.typeArguments?.[typeParameterIndex]);
        return o;
      },
      {} as Record<number, JsonAbiArgument>
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.resolveGenericArgs(abi, abiType.components!, typeParametersAndArgsMap);
  }

  static getCoder(abi: JsonAbi, argument: JsonAbiArgument): Coder {
    const abiType = findOrThrow(
      abi.types,
      (t) => t.typeId === argument.type,
      () =>
        logger.throwArgumentError('Type does not exist in the provided abi', 'type', {
          argument,
          abi,
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
    const components = this.resolveGenericComponents(abi, argument);

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new FuelError(
          FuelError.CODES.INVALID_TYPE,
          'Expected array type to have an item component'
        );
      }

      const arrayElementCoder = this.getCoder(abi, arg);
      return new ArrayCoder(arrayElementCoder, length);
    }

    if (abiType.type === VEC_CODER_TYPE) {
      const typeArgument = components.find((x) => x.name === 'buf')?.typeArguments?.[0];
      if (!typeArgument) {
        throw new FuelError(
          FuelError.CODES.INVALID_TYPE,
          'Expected Vec type to have a type argument'
        );
      }
      const itemCoder = this.getCoder(abi, typeArgument);
      return new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(abiType.type)?.groups;
    if (structMatch) {
      const coders = this.getCoders(components, abi);
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(abiType.type)?.groups;
    if (enumMatch) {
      const coders = this.getCoders(components, abi);

      const isOptionEnum = abiType.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    const tupleMatch = tupleRegEx.exec(abiType.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) => this.getCoder(abi, component));
      return new TupleCoder(coders);
    }

    return logger.throwArgumentError('Coder not found', 'type', { abiType, abi });
  }

  private static getCoders(components: readonly JsonAbiArgument[], abi: JsonAbi) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = this.getCoder(abi, component);
      return o;
    }, {});
  }

  static encode(abi: JsonAbi, argument: JsonAbiArgument, value: InputValue) {
    return this.getCoder(abi, argument).encode(value);
  }

  static decode(
    abi: JsonAbi,
    arg: JsonAbiArgument,
    data: Uint8Array,
    offset: number
  ): [DecodedValue | undefined, number] {
    return this.getCoder(abi, arg).decode(data, offset) as [DecodedValue | undefined, number];
  }
}
