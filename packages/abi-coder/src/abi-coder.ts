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
} from './constants';
import type { JsonFlatAbi, JsonFlatAbiFragmentArgumentType } from './json-abi';

const logger = new Logger(versions.FUELS);

export default class AbiCoder {
  constructor() {
    logger.checkNew(new.target, AbiCoder);
  }

  static resolveGenericArgs(
    args: readonly JsonFlatAbiFragmentArgumentType[],
    typeParametersAndArgsMap: Record<number, JsonFlatAbiFragmentArgumentType> | undefined
  ): readonly JsonFlatAbiFragmentArgumentType[] {
    if (typeParametersAndArgsMap === undefined) return args;

    return args.map((arg) => {
      if (typeParametersAndArgsMap[arg.type] !== undefined) {
        return {
          ...typeParametersAndArgsMap[arg.type],
          name: arg.name,
        };
      }

      if (arg.typeArguments === null) return arg;

      const argClone: JsonFlatAbiFragmentArgumentType = { ...structuredClone(arg) };

      return {
        ...argClone,
        typeArguments: this.resolveGenericArgs(argClone.typeArguments!, typeParametersAndArgsMap),
      };
    });
  }

  private static getCoder(abi: JsonFlatAbi, argument: JsonFlatAbiFragmentArgumentType): Coder {
    const type = abi.types.find((t) => t.typeId === argument.type);
    if (type === undefined) return logger.throwArgumentError('Invalid type', 'type', argument.type);

    switch (type.type) {
      case 'u8':
      case 'u16':
      case 'u32':
        return new NumberCoder(type.type);
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

    const stringMatch = stringRegEx.exec(type.type)?.groups;
    if (stringMatch) {
      const length = parseInt(stringMatch.length, 10);

      return new StringCoder(length);
    }

    if (['raw untyped slice'].includes(type.type)) {
      const length = 0;
      const itemCoder = new U64Coder();
      return new ArrayCoder(itemCoder, length);
    }

    // All abi types below MUST have components

    const components = this.resolveGenericArgs(
      type.components!,
      type.typeParameters?.reduce((obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonFlatAbiFragmentArgumentType> = { ...obj };
        o[typeParameter] = argument.typeArguments![typeParameterIndex];
        return o;
      }, {})
    );

    const arrayMatch = arrayRegEx.exec(type.type)?.groups;
    if (arrayMatch) {
      const length = parseInt(arrayMatch.length, 10);
      const arg = components[0];
      if (!arg) {
        throw new Error('Expected array type to have an item component');
      }

      const arrayElementCoder = this.getCoder(abi, arg);
      return new ArrayCoder(arrayElementCoder, length);
    }

    const tupleMatch = tupleRegEx.exec(type.type)?.groups;
    if (tupleMatch) {
      const coders = components.map((component) => this.getCoder(abi, component));
      return new TupleCoder(coders);
    }

    if (type.type === VEC_CODER_TYPE) {
      const typeArgument = components.find((x) => x.name === 'buf')!.typeArguments![0];
      if (!typeArgument) {
        throw new Error('Expected Vec type to have a type argument');
      }
      const itemCoder = this.getCoder(abi, typeArgument);
      return new VecCoder(itemCoder);
    }

    const structMatch = structRegEx.exec(type.type)?.groups;
    if (structMatch) {
      const coders = this.getCoders(components, abi);
      return new StructCoder(structMatch.name, coders);
    }

    const enumMatch = enumRegEx.exec(type.type)?.groups;
    if (enumMatch) {
      const coders = this.getCoders(components, abi);

      const isOptionEnum = type.type === OPTION_CODER_TYPE;
      if (isOptionEnum) {
        return new OptionCoder(enumMatch.name, coders);
      }
      return new EnumCoder(enumMatch.name, coders);
    }

    return logger.throwArgumentError('Invalid type', 'type', type.type);
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

  // encode(types: ReadonlyArray<JsonAbiFragmentType>, values: InputValue[], offset = 0): Uint8Array {
  //     const nonEmptyTypes = filterEmptyParams(types);
  //     const shallowCopyValues = values.slice();
  //
  //     if (Array.isArray(values) && nonEmptyTypes.length !== values.length) {
  //         if (!hasOptionTypes(types)) {
  //             logger.throwError(
  //                 'Types/values length mismatch during encode',
  //                 Logger.errors.INVALID_ARGUMENT,
  //                 {
  //                     count: {
  //                         types: types.length,
  //                         nonEmptyTypes: nonEmptyTypes.length,
  //                         values: values.length,
  //                     },
  //                     value: {
  //                         types,
  //                         nonEmptyTypes,
  //                         values,
  //                     },
  //                 }
  //             );
  //         } else {
  //             shallowCopyValues.length = types.length;
  //             shallowCopyValues.fill(undefined as unknown as InputValue, values.length);
  //         }
  //     }
  //
  //     const coders = nonEmptyTypes.map((type) => this.getCoder(type));
  //     const vectorData = getVectorAdjustments(coders, shallowCopyValues, offset);
  //
  //     const coder = new TupleCoder(coders);
  //     const results = coder.encode(shallowCopyValues);
  //
  //     return concat([results, concat(vectorData)]);
  // }
  //
  // decode(args: readonly JsonFlatAbiFragmentArgumentType[], data: BytesLike): DecodedValue[] | undefined {
  //     const types = args.map(x => this.abi.types.find(t => t.typeId === x.type)!);
  //     const bytes = arrayify(data);
  //     const nonEmptyTypes = types.filter((t) => t.type !== '()');
  //     const assertParamsMatch = (newOffset: number) => {
  //         if (newOffset !== bytes.length) {
  //             logger.throwError(
  //                 'Types/values length mismatch during decode',
  //                 Logger.errors.INVALID_ARGUMENT,
  //                 {
  //                     count: {
  //                         types: types.length,
  //                         nonEmptyTypes: nonEmptyTypes.length,
  //                         values: bytes.length,
  //                         newOffset,
  //                     },
  //                     value: {
  //                         types,
  //                         nonEmptyTypes,
  //                         values: bytes,
  //                     },
  //                 }
  //             );
  //         }
  //     };
  //
  //     if (types.length === 0 || nonEmptyTypes.length === 0) {
  //         // The VM is current return 0x0000000000000000, but we should treat it as undefined / void
  //         assertParamsMatch(bytes.length ? 8 : 0);
  //         return undefined;
  //     }
  //
  //     const coders = nonEmptyTypes.map((type) => this.getCoder(type));
  //     if (nonEmptyTypes[0] && nonEmptyTypes[0].type === 'raw untyped slice') {
  //         (coders[0] as ArrayCoder<U64Coder>).length = bytes.length / 8;
  //     }
  //     const coder = new TupleCoder(coders);
  //     const [decoded] = coder.decode(bytes, 0);
  //
  //     return decoded as DecodedValue[];
  // }
}
