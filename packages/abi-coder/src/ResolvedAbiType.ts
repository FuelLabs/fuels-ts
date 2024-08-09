import { FuelError, ErrorCode } from '@fuel-ts/errors';

import type { JsonAbiOld, JsonAbiArgument } from './types/JsonAbi';
import { arrayRegEx, enumRegEx, genericRegEx, stringRegEx, structRegEx } from './utils/constants';
import { findTypeById } from './utils/json-abi';

export class ResolvedAbiType {
  readonly abi: JsonAbiOld;
  name: string;
  readonly type: string;
  readonly originalTypeArguments: readonly JsonAbiArgument[] | null;
  readonly components: readonly ResolvedAbiType[] | null;

  constructor(abi: JsonAbiOld, argument: JsonAbiArgument) {
    this.abi = abi;

    this.name = argument.name;

    const jsonABIType = findTypeById(abi, argument.type);

    if (jsonABIType.type.length > 256) {
      throw new FuelError(
        ErrorCode.INVALID_COMPONENT,
        `The provided ABI type is too long: ${jsonABIType.type}.`
      );
    }

    this.type = jsonABIType.type;
    this.originalTypeArguments = argument.typeArguments;
    this.components = ResolvedAbiType.getResolvedGenericComponents(
      abi,
      argument,
      jsonABIType.components,
      jsonABIType.typeParameters ??
        ResolvedAbiType.getImplicitGenericTypeParameters(abi, jsonABIType.components)
    );
  }

  private static getResolvedGenericComponents(
    abi: JsonAbiOld,
    arg: JsonAbiArgument,
    components: readonly JsonAbiArgument[] | null,
    typeParameters: readonly number[] | null
  ) {
    if (components === null) {
      return null;
    }
    if (typeParameters === null || typeParameters.length === 0) {
      return components.map((c) => new ResolvedAbiType(abi, c));
    }

    const typeParametersAndArgsMap = typeParameters.reduce(
      (obj, typeParameter, typeParameterIndex) => {
        const o: Record<number, JsonAbiArgument> = { ...obj };
        o[typeParameter] = structuredClone(
          arg.typeArguments?.[typeParameterIndex]
        ) as JsonAbiArgument;
        return o;
      },
      {} as Record<number, JsonAbiArgument>
    );

    const resolvedComponents = this.resolveGenericArgTypes(
      abi,
      components,
      typeParametersAndArgsMap
    );

    return resolvedComponents.map((c) => new ResolvedAbiType(abi, c));
  }

  private static resolveGenericArgTypes(
    abi: JsonAbiOld,
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

      if (arg.typeArguments) {
        return {
          ...structuredClone(arg),
          typeArguments: this.resolveGenericArgTypes(
            abi,
            arg.typeArguments,
            typeParametersAndArgsMap
          ),
        };
      }

      const argType = findTypeById(abi, arg.type);
      const implicitTypeParameters = this.getImplicitGenericTypeParameters(abi, argType.components);

      if (implicitTypeParameters && implicitTypeParameters.length > 0) {
        return {
          ...structuredClone(arg),
          typeArguments: implicitTypeParameters.map((itp) => typeParametersAndArgsMap[itp]),
        };
      }

      return arg;
    });
  }

  private static getImplicitGenericTypeParameters(
    abi: JsonAbiOld,
    args: readonly JsonAbiArgument[] | null,
    implicitGenericParametersParam?: number[]
  ) {
    if (!Array.isArray(args)) {
      return null;
    }

    const implicitGenericParameters: number[] = implicitGenericParametersParam ?? [];

    args.forEach((a) => {
      const argType = findTypeById(abi, a.type);

      if (genericRegEx.test(argType.type)) {
        implicitGenericParameters.push(argType.typeId);
        return;
      }

      if (!Array.isArray(a.typeArguments)) {
        return;
      }
      this.getImplicitGenericTypeParameters(abi, a.typeArguments, implicitGenericParameters);
    });

    return implicitGenericParameters.length > 0 ? implicitGenericParameters : null;
  }

  getSignature(): string {
    const prefix = this.getArgSignaturePrefix();
    const content = this.getArgSignatureContent();

    return `${prefix}${content}`;
  }

  private getArgSignaturePrefix(): string {
    const structMatch = structRegEx.test(this.type);
    if (structMatch) {
      return 's';
    }

    const arrayMatch = arrayRegEx.test(this.type);
    if (arrayMatch) {
      return 'a';
    }

    const enumMatch = enumRegEx.test(this.type);
    if (enumMatch) {
      return 'e';
    }

    return '';
  }

  private getArgSignatureContent(): string {
    if (this.type === 'raw untyped ptr') {
      return 'rawptr';
    }

    if (this.type === 'raw untyped slice') {
      return 'rawslice';
    }

    const strMatch = stringRegEx.exec(this.type)?.groups;
    if (strMatch) {
      return `str[${strMatch.length}]`;
    }

    if (this.components === null) {
      return this.type;
    }

    const arrayMatch = arrayRegEx.exec(this.type)?.groups;

    if (arrayMatch) {
      return `[${this.components[0].getSignature()};${arrayMatch.length}]`;
    }

    const typeArgumentsSignature =
      this.originalTypeArguments !== null
        ? `<${this.originalTypeArguments
            .map((a) => new ResolvedAbiType(this.abi, a).getSignature())
            .join(',')}>`
        : '';

    const componentsSignature = `(${this.components.map((c) => c.getSignature()).join(',')})`;

    return `${typeArgumentsSignature}${componentsSignature}`;
  }
}
