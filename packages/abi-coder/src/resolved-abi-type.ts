import { Logger } from '@ethersproject/logger';
import { versions } from '@fuel-ts/versions';

import { genericRegEx } from './constants';
import type { JsonAbi, JsonAbiArgument } from './json-abi';
import { findOrThrow } from './utilities';

const logger = new Logger(versions.FUELS);

export class ResolvedAbiType {
  private readonly abi: JsonAbi;
  readonly type: string;
  private readonly typeParameters: readonly number[] | null;
  readonly components: readonly JsonAbiArgument[] | null;

  constructor(abi: JsonAbi, argument: JsonAbiArgument) {
    this.abi = abi;
    const type = findOrThrow(
      abi.types,
      (t) => t.typeId === argument.type,
      () =>
        logger.throwArgumentError('Type does not exist in the provided abi', 'type', {
          argument,
          abi: this.abi,
        })
    );

    this.type = type.type;
    const typeParameters =
      type.typeParameters ?? ResolvedAbiType.getImplicitGenericTypeParameters(abi, type.components);
    this.typeParameters = typeParameters;
    this.components = ResolvedAbiType.getResolvedGenericComponents(
      abi,
      argument,
      type.components,
      typeParameters
    );
  }

  private static getResolvedGenericComponents(
    abi: JsonAbi,
    arg: JsonAbiArgument,
    components: readonly JsonAbiArgument[] | null,
    typeParameters: readonly number[] | null
  ) {
    if (components === null) return null;
    if (typeParameters === null || typeParameters.length === 0) return components;

    const typeParametersAndArgsMap = typeParameters.reduce(
      (obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonAbiArgument> = { ...obj };
        o[typeParameter] = structuredClone(arg.typeArguments?.[typeParameterIndex]);
        return o;
      },
      {} as Record<number, JsonAbiArgument>
    );

    return this.resolveGenericArgTypes(abi, components, typeParametersAndArgsMap);
  }

  private static resolveGenericArgTypes(
    abi: JsonAbi,
    args: readonly JsonAbiArgument[],
    typeParametersAndArgsMap: Record<number, JsonAbiArgument>
  ): readonly JsonAbiArgument[] {
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
          typeArguments: this.resolveGenericArgTypes(
            abi,
            arg.typeArguments,
            typeParametersAndArgsMap
          ),
        };
      }

      const argType = new ResolvedAbiType(abi, arg);

      if (argType.typeParameters && argType.typeParameters.length > 0) {
        return {
          ...structuredClone(arg),
          typeArguments: argType.typeParameters.map((tp) => typeParametersAndArgsMap[tp]),
        };
      }

      return arg;
    });
  }

  private static getImplicitGenericTypeParameters(
    abi: JsonAbi,
    components: readonly JsonAbiArgument[] | null,
    implicitGenericParametersParam?: number[]
  ) {
    if (components === null) return null;
    const implicitGenericParameters: number[] = implicitGenericParametersParam ?? [];

    components.forEach((c) => {
      const cType = findOrThrow(abi.types, (t) => t.typeId === c.type);

      const isGeneric = genericRegEx.test(cType.type);

      if (isGeneric) {
        implicitGenericParameters.push(cType.typeId);
        return;
      }

      if (Array.isArray(c.typeArguments))
        this.getImplicitGenericTypeParameters(abi, c.typeArguments, implicitGenericParameters);
    });

    return implicitGenericParameters.length > 0 ? implicitGenericParameters : null;
  }
}
