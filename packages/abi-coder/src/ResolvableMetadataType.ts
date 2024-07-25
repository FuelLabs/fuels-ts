import { ResolvedType } from './ResolvedType';
import type { MetadataType, JsonAbi, Component, TypeArgument, ConcreteType } from './types/JsonAbi';
import { isVector, genericRegEx } from './utils/constants';

export class ResolvableMetadataType {
  metadataType: MetadataType;
  type: string;

  components: { name: string; type: ResolvableMetadataType | ResolvedType }[] | undefined;
  constructor(
    abi: JsonAbi,
    public metadataTypeId: number,
    public typeParamsArgsMap: Array<[number, ResolvedType | ResolvableMetadataType]> | undefined
  ) {
    const metadataType = abi.metadataTypes.find(
      (tm) => tm.metadataTypeId === metadataTypeId
    ) as MetadataType;
    this.metadataType = metadataType;
    this.type = metadataType.type;

    this.typeParamsArgsMap ??= ResolvableMetadataType.mapTypeParametersAndArgs(
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
    this.components = components?.map((c) => ResolvableMetadataType.handleComponent(abi, c));
  }

  private static mapTypeParametersAndArgs(
    abi: JsonAbi,
    metadataType: MetadataType,
    args: (ResolvableMetadataType | ResolvedType)[] | undefined
  ): Array<[number, ResolvedType | ResolvableMetadataType]> | undefined {
    if (!args) {
      return metadataType.typeParameters?.map((typeParameter) => [
        typeParameter,
        new ResolvableMetadataType(abi, typeParameter, undefined),
      ]);
    }

    return metadataType.typeParameters?.map((typeParameter, idx) => [typeParameter, args[idx]]);
  }

  private static handleComponent(
    abi: JsonAbi,
    c: Component | TypeArgument
  ): { name: string; type: ResolvableMetadataType | ResolvedType } {
    if (typeof c.typeId === 'string') {
      const concreteType = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === c.typeId
      ) as ConcreteType;
      return {
        name: (c as Component).name,
        type: ResolvableMetadataType.resolveConcreteType(abi, concreteType),
      };
    }

    const mt = abi.metadataTypes.find((tm) => tm.metadataTypeId === c.typeId) as MetadataType;

    if (genericRegEx.test(mt.type)) {
      return {
        name: (c as Component).name,
        type: new ResolvableMetadataType(abi, c.typeId, undefined),
      };
    }

    if (!mt.components) {
      return {
        name: (c as Component).name,
        /**
         * types like u8, u16 can make their way into metadata types
         * if they aren't used _directly_ in a function-input/function-output/log/configurable/messageData
         * These types are characterized by not having components and we can resolve then as-is
         */
        type: new ResolvableMetadataType(abi, c.typeId, undefined).resolveInternal(undefined),
      };
    }

    const typeArgs = c.typeArguments?.map((ta) => this.handleComponent(abi, ta).type);

    const resolvable = new ResolvableMetadataType(
      abi,
      c.typeId,
      this.mapTypeParametersAndArgs(abi, mt, typeArgs)
    );

    if (typeArgs?.every((ta) => ta instanceof ResolvedType)) {
      return {
        name: (c as Component).name,
        type: resolvable.resolveInternal(undefined),
      };
    }

    if (resolvable.components?.every((comp) => comp.type instanceof ResolvedType)) {
      return {
        name: (c as Component).name,
        type: resolvable.resolveInternal(undefined),
      };
    }

    return {
      name: (c as Component).name,
      type: resolvable,
    };
  }

  private static resolveConcreteType(abi: JsonAbi, type: ConcreteType): ResolvedType {
    const concreteType = type;
    if (concreteType.metadataTypeId === undefined) {
      return new ResolvedType(concreteType.type, undefined, undefined, undefined);
    }

    if (!concreteType.typeArguments) {
      return new ResolvableMetadataType(
        abi,
        concreteType.metadataTypeId,
        undefined
      ).resolveInternal(undefined);
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

    return new ResolvableMetadataType(
      abi,
      concreteType.metadataTypeId,
      ResolvableMetadataType.mapTypeParametersAndArgs(abi, metadataType, concreteTypeArgs)
    ).resolveInternal(undefined);
  }

  public resolve(abi: JsonAbi, concreteType: ConcreteType) {
    const concreteTypeArgs = concreteType.typeArguments?.map((ta) => {
      const concreteTypeArg = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === ta
      ) as ConcreteType;
      return ResolvableMetadataType.resolveConcreteType(abi, concreteTypeArg);
    });

    return this.resolveInternal(
      ResolvableMetadataType.mapTypeParametersAndArgs(
        abi,
        this.metadataType,
        concreteTypeArgs
      ) as Array<[number, ResolvedType]>
    );
  }

  private resolveTypeArgs(
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): [number, ResolvedType][] | undefined {
    return this.typeParamsArgsMap
      ? this.typeParamsArgsMap.map(([typeParameter, value]) => {
          if (value instanceof ResolvedType) {
            return [+typeParameter, value];
          }

          const resolved = typeParamsArgsMap?.find(([tp]) => tp === value.metadataTypeId)?.[1];
          return [+typeParameter, resolved as ResolvedType];
        })
      : typeParamsArgsMap;
  }

  private resolveInternal(
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): ResolvedType {
    const typeArgs = this.resolveTypeArgs(typeParamsArgsMap);

    const components: { name: string; type: ResolvedType }[] | undefined = this.components?.map(
      (c) => {
        if (c.type instanceof ResolvedType) {
          return c as { name: string; type: ResolvedType };
        }

        const resolvedGenericType = typeArgs?.find(([tp]) => c.type.metadataTypeId === tp)?.[1];
        if (resolvedGenericType) {
          return {
            name: c.name,
            type: resolvedGenericType,
          };
        }

        return { name: c.name, type: c.type.resolveInternal(typeArgs) };
      }
    );
    return new ResolvedType(this.metadataType.type, this.metadataTypeId, components, typeArgs);
  }
}
