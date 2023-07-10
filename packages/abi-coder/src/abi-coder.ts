// See: https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI
import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import type { DecodedValue, InputValue } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import ArrayCoder from './coders/array';
import B256Coder from './coders/b256';
import B512Coder from './coders/b512';
import BooleanCoder from './coders/boolean';
import ByteCoder from './coders/byte';
import EnumCoder from './coders/enum';
import NumberCoder from './coders/number';
import OptionCoder from './coders/option';
import StringCoder from './coders/string';
import StructCoder from './coders/struct';
import TupleCoder from './coders/tuple';
import U64Coder from './coders/u64';
import VecCoder from './coders/vec';
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
import type {
  JsonFlatAbi,
  JsonFlatAbiFragmentArgumentType,
  JsonFlatAbiFragmentType,
} from './json-abi';

const logger = new Logger(versions.FUELS);

export default abstract class AbiCoder {
  private static getImplicitGenericTypeParameters(
    abi: JsonFlatAbi,
    abiType: JsonFlatAbiFragmentType,
    implicitGenericParametersParam: number[] | undefined = undefined
  ): number[] {
    const isExplicitGeneric = abiType.typeParameters !== null;
    if (isExplicitGeneric || abiType.components === null) return [];

    const implicitGenericParameters: number[] = implicitGenericParametersParam ?? [];

    abiType.components.forEach((component) => {
      const componentType = abi.types.find((t) => t.typeId === component.type)!;
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
    abi: JsonFlatAbi,
    args: readonly JsonFlatAbiFragmentArgumentType[],
    typeParametersAndArgsMap: Record<number, JsonFlatAbiFragmentArgumentType>
  ): readonly JsonFlatAbiFragmentArgumentType[] {
    if (Object.keys(typeParametersAndArgsMap).length === 0) return args;

    return args.map((arg) => {
      if (typeParametersAndArgsMap[arg.type] !== undefined) {
        return {
          ...typeParametersAndArgsMap[arg.type],
          name: arg.name,
        };
      }

      if (arg.typeArguments !== null) {
        const argClone: JsonFlatAbiFragmentArgumentType = structuredClone(arg);

        return {
          ...argClone,
          typeArguments: this.resolveGenericArgs(
            abi,
            argClone.typeArguments!,
            typeParametersAndArgsMap
          ),
        };
      }

      const abiType = abi.types.find((x) => x.typeId === arg.type)!;
      if (abiType.components === null) return arg;
      const implicitGenericParameters = this.getImplicitGenericTypeParameters(abi, abiType);
      if (implicitGenericParameters.length === 0) return arg;
      const argClone = structuredClone(arg);

      return {
        ...argClone,
        typeArguments: implicitGenericParameters.map((tp) => typeParametersAndArgsMap[tp]),
      };
    });
  }

  static resolveGenericComponents(
    abi: JsonFlatAbi,
    arg: JsonFlatAbiFragmentArgumentType
  ): readonly JsonFlatAbiFragmentArgumentType[] {
    let abiType = abi.types.find((t) => t.typeId === arg.type)!;

    const implicitGenericTypeParameters = this.getImplicitGenericTypeParameters(abi, abiType);
    if (implicitGenericTypeParameters.length > 0) {
      abiType = { ...structuredClone(abiType), typeParameters: implicitGenericTypeParameters };
    }

    const typeParametersAndArgsMap: Record<number, JsonFlatAbiFragmentArgumentType> =
      abiType.typeParameters?.reduce((obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonFlatAbiFragmentArgumentType> = { ...obj };
        o[typeParameter] = structuredClone(arg.typeArguments![typeParameterIndex]);
        return o;
      }, {}) ?? {};

    return this.resolveGenericArgs(abi, abiType.components!, typeParametersAndArgsMap);
  }

  static getCoder(abi: JsonFlatAbi, argument: JsonFlatAbiFragmentArgumentType): Coder {
    const abiType = abi.types.find((t) => t.typeId === argument.type)!;
    if (abiType === undefined)
      return logger.throwArgumentError('Invalid type', 'type', argument.type);

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

    const components = this.resolveGenericComponents(abi, argument);

    // const implicitTypeParameters = this.getImplicitGenericTypeParameters(abi, abiType);
    // if (implicitTypeParameters.length > 0) {
    //   abiType = { ...structuredClone(abiType), typeParameters: implicitTypeParameters };
    // }
    //
    // // All abi types below MUST have components
    // const components = this.resolveGenericArgs(
    //   abi,
    //   abiType.components!,
    //   abiType.typeParameters?.reduce((obj, typeParameter, typeParameterIndex) => {
    //     const o: Record<number, JsonFlatAbiFragmentArgumentType> = { ...obj };
    //     o[typeParameter] = argument.typeArguments![typeParameterIndex];
    //     return o;
    //   }, {})
    // );

    const arrayMatch = arrayRegEx.exec(abiType.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new Error('Expected array type to have an item component');
      }

      const arrayElementCoder = this.getCoder(abi, arg);
      return new ArrayCoder(arrayElementCoder, length);
    }

    if (abiType.type === VEC_CODER_TYPE) {
      const typeArgument = components.find((x) => x.name === 'buf')!.typeArguments![0];
      if (!typeArgument) {
        throw new Error('Expected Vec type to have a type argument');
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

    return logger.throwArgumentError('Invalid type', 'type', abiType.type);
  }

  private static getCoders(
    components: readonly JsonFlatAbiFragmentArgumentType[],
    abi: JsonFlatAbi
  ) {
    return components.reduce((obj, component) => {
      const o: Record<string, Coder> = obj;

      o[component.name] = this.getCoder(abi, component);
      return o;
    }, {});
  }

  static encode(abi: JsonFlatAbi, argument: JsonFlatAbiFragmentArgumentType, value: InputValue) {
    return this.getCoder(abi, argument).encode(value);
  }

  static decode(
    abi: JsonFlatAbi,
    arg: JsonFlatAbiFragmentArgumentType,
    data: Uint8Array,
    offset: number
  ): [DecodedValue | undefined, number] {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getCoder(abi, arg).decode(data, offset);
  }
}
