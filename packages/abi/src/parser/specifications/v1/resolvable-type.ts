import { ResolvedType } from './resolved-type';
import type {
  AbiComponentV1,
  AbiConcreteTypeV1,
  AbiMetadataTypeV1,
  AbiSpecificationV1,
  AbiTypeArgumentV1,
} from './specification';

export function isVector(type: string) {
  const MATCH_REGEX: RegExp = /^struct (std::vec::)?Vec/m;
  const IGNORE_REGEX: RegExp = /^struct (std::vec::)?RawVec$/m;

  return MATCH_REGEX.test(type) && !IGNORE_REGEX.test(type);
}

export const genericRegEx = /^generic.+$/;

interface ResolvableComponent {
  name: string;
  type: ResolvableType | ResolvedType;
}

export class ResolvableType {
  private metadataType: AbiMetadataTypeV1;
  type: string;
  components: ResolvableComponent[] | undefined;

  constructor(
    abi: AbiSpecificationV1,
    public metadataTypeId: number,
    public typeParamsArgsMap: Array<[number, ResolvedType | ResolvableType]> | undefined
  ) {
    const metadataType = abi.metadataTypes.find(
      (tm) => tm.metadataTypeId === metadataTypeId
    ) as AbiMetadataTypeV1;

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
          return {
            ...c.typeArguments?.[0],
            name: c.name,
          };
        }
        return c;
      }) as AbiComponentV1[];
    }

    this.components = components?.map((c) => ResolvableType.handleComponent(abi, c));
  }

  private static mapTypeParametersAndArgs(
    abi: AbiSpecificationV1,
    metadataType: AbiMetadataTypeV1,
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

  private static handleComponent(
    abi: AbiSpecificationV1,
    c: AbiComponentV1 | AbiTypeArgumentV1
  ): ResolvableComponent {
    const name = (c as AbiComponentV1).name;

    if (typeof c.typeId === 'string') {
      const concreteType = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === c.typeId
      ) as AbiConcreteTypeV1;
      return {
        name,
        type: ResolvableType.resolveConcreteType(abi, concreteType),
      };
    }

    const mt = abi.metadataTypes.find((tm) => tm.metadataTypeId === c.typeId) as AbiMetadataTypeV1;

    return {
      name,
      type: ResolvableType.handleMetadataType(abi, mt, c.typeArguments),
    };
  }

  private static resolveConcreteType(
    abi: AbiSpecificationV1,
    type: AbiConcreteTypeV1
  ): ResolvedType {
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
    ) as AbiMetadataTypeV1;

    const concreteTypeArgs = concreteType.typeArguments.map((ta) => {
      const concreteTypeArg = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === ta
      ) as AbiConcreteTypeV1;
      return this.resolveConcreteType(abi, concreteTypeArg);
    });

    return new ResolvableType(
      abi,
      concreteType.metadataTypeId,
      ResolvableType.mapTypeParametersAndArgs(abi, metadataType, concreteTypeArgs)
    ).resolveInternal(concreteType.concreteTypeId, undefined);
  }

  private static handleMetadataType(
    abi: AbiSpecificationV1,
    mt: AbiMetadataTypeV1,
    typeArguments: AbiComponentV1['typeArguments']
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

  public resolve(abi: AbiSpecificationV1, concreteType: AbiConcreteTypeV1) {
    const concreteTypeArgs = concreteType.typeArguments?.map((ta) => {
      const concreteTypeArg = abi.concreteTypes.find(
        (ct) => ct.concreteTypeId === ta
      ) as AbiConcreteTypeV1;
      return ResolvableType.resolveConcreteType(abi, concreteTypeArg);
    });

    const typeParamsArgsMap = ResolvableType.mapTypeParametersAndArgs(
      abi,
      this.metadataType,
      concreteTypeArgs
    ) as Array<[number, ResolvedType]>;

    return this.resolveInternal(concreteType.concreteTypeId, typeParamsArgsMap);
  }
}
