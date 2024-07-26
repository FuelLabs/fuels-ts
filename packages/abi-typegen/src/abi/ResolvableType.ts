/**
 * This file is a copy of the one in abi-coder and will be deleted once the packages merge.
 */
import type {
  MetadataType,
  JsonAbi,
  Component,
  TypeArgument,
  ConcreteType,
} from '../types/interfaces/JsonAbi';
import { isVector, genericRegEx } from '../utils/constants';

import { ResolvedType } from './ResolvedType';

interface ResolvableComponent {
  name: string;
  type: ResolvableType | ResolvedType;
}

export class ResolvableType {
  private metadataType: MetadataType;
  type: string;

  components: ResolvableComponent[] | undefined;
  constructor(
    abi: JsonAbi,
    public metadataTypeId: number,
    public typeParamsArgsMap: Array<[number, ResolvedType | ResolvableType]> | undefined
  ) {
    const metadataType = abi.metadataTypes.find(
      (tm) => tm.metadataTypeId === metadataTypeId
    ) as MetadataType;
    this.metadataType = metadataType;
    this.type = metadataType.type;

    this.typeParamsArgsMap ??= ResolvableType.mapTypeParametersAndArgs(
      abi,
      metadataType,
      undefined
    );

    let components = metadataType.components;
    if (isVector(metadataType.type)) {
      components = components?.map((c) => {
        if (c.name === 'buf') {
          return c.typeArguments?.[0];
        }
        return c;
      }) as Component[];
    }
    this.components = components?.map((c) => ResolvableType.handleComponent(abi, c));
  }

  private static mapTypeParametersAndArgs(
    abi: JsonAbi,
    metadataType: MetadataType,
    args: (ResolvableType | ResolvedType)[] | undefined
  ): Array<[number, ResolvedType | ResolvableType]> | undefined {
    if (!args) {
      return metadataType.typeParameters?.map((typeParameter) => [
        typeParameter,
        new ResolvableType(abi, typeParameter, undefined),
      ]);
    }

    return metadataType.typeParameters?.map((typeParameter, idx) => [typeParameter, args[idx]]);
  }

  private static handleComponent(abi: JsonAbi, c: Component | TypeArgument): ResolvableComponent {
    const name = (c as Component).name;

    if (typeof c.typeId === 'string') {
      const concreteType = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === c.typeId
      ) as ConcreteType;
      return {
        name,
        type: ResolvableType.resolveConcreteType(abi, concreteType),
      };
    }

    const mt = abi.metadataTypes.find((tm) => tm.metadataTypeId === c.typeId) as MetadataType;

    return {
      name,
      type: ResolvableType.handleMetadataType(abi, mt, c.typeArguments),
    };
  }

  private static resolveConcreteType(abi: JsonAbi, type: ConcreteType): ResolvedType {
    const concreteType = type;
    if (concreteType.metadataTypeId === undefined) {
      return new ResolvedType(concreteType.type, concreteType.concreteTypeId, undefined, undefined);
    }

    if (!concreteType.typeArguments) {
      return new ResolvableType(abi, concreteType.metadataTypeId, undefined).resolveInternal(
        concreteType.concreteTypeId,
        undefined
      );
    }

    const metadataType = abi.metadataTypes.find(
      (mt) => mt.metadataTypeId === concreteType.metadataTypeId
    ) as MetadataType;

    const concreteTypeArgs = concreteType.typeArguments.map((ta) => {
      const concreteTypeArg = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === ta
      ) as ConcreteType;
      return this.resolveConcreteType(abi, concreteTypeArg);
    });

    return new ResolvableType(
      abi,
      concreteType.metadataTypeId,
      ResolvableType.mapTypeParametersAndArgs(abi, metadataType, concreteTypeArgs)
    ).resolveInternal(concreteType.concreteTypeId, undefined);
  }

  private static handleMetadataType(
    abi: JsonAbi,
    mt: MetadataType,
    typeArguments: Component['typeArguments']
  ): ResolvableType | ResolvedType {
    if (genericRegEx.test(mt.type)) {
      return new ResolvableType(abi, mt.metadataTypeId, undefined);
    }

    if (!mt.components) {
      /**
       * types like u8, u16 can make their way into metadata types
       * if they aren't used _directly_ in a function-input/function-output/log/configurable/messageType
       * These types are characterized by not having components and we can resolve then as-is
       */
      return new ResolvableType(abi, mt.metadataTypeId, undefined).resolveInternal(
        mt.metadataTypeId,
        undefined
      );
    }

    const typeArgs = typeArguments?.map((ta) => this.handleComponent(abi, ta).type);

    const resolvable = new ResolvableType(
      abi,
      mt.metadataTypeId,
      this.mapTypeParametersAndArgs(abi, mt, typeArgs)
    );

    if (typeArgs?.every((ta) => ta instanceof ResolvedType)) {
      return resolvable.resolveInternal(mt.metadataTypeId, undefined);
    }

    if (resolvable.components?.every((comp) => comp.type instanceof ResolvedType)) {
      return resolvable.resolveInternal(mt.metadataTypeId, undefined);
    }

    return resolvable;
  }

  private resolveInternal(
    typeId: string | number,
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): ResolvedType {
    const typeArgs = this.resolveTypeArgs(typeParamsArgsMap);

    const components: ResolvedType['components'] = this.components?.map((c) => {
      if (c.type instanceof ResolvedType) {
        return c as { name: string; type: ResolvedType };
      }

      const resolvedGenericType = typeArgs?.find(
        ([tp]) => (c.type as ResolvableType).metadataTypeId === tp
      )?.[1];
      if (resolvedGenericType) {
        return {
          name: c.name,
          type: resolvedGenericType,
        };
      }

      return { name: c.name, type: c.type.resolveInternal(c.type.metadataTypeId, typeArgs) };
    });
    return new ResolvedType(this.metadataType.type, typeId, components, typeArgs);
  }

  private resolveTypeArgs(
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): [number, ResolvedType][] | undefined {
    return this.typeParamsArgsMap === undefined
      ? typeParamsArgsMap
      : this.typeParamsArgsMap.map(([typeParameter, value]) => {
          if (value instanceof ResolvedType) {
            return [+typeParameter, value];
          }

          const resolved = typeParamsArgsMap?.find(([tp]) => tp === value.metadataTypeId)?.[1];
          return [+typeParameter, resolved as ResolvedType];
        });
  }

  public resolve(abi: JsonAbi, concreteType: ConcreteType) {
    const concreteTypeArgs = concreteType.typeArguments?.map((ta) => {
      const concreteTypeArg = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === ta
      ) as ConcreteType;
      return ResolvableType.resolveConcreteType(abi, concreteTypeArg);
    });

    return this.resolveInternal(
      concreteType.concreteTypeId,
      ResolvableType.mapTypeParametersAndArgs(abi, this.metadataType, concreteTypeArgs) as Array<
        [number, ResolvedType]
      >
    );
  }
}
