import { FuelError } from '@fuel-ts/errors';

import { swayTypeMatchers } from '../../../matchers/sway-type-matchers';
import type { AbiTypeMetadata } from '../../abi';

import { ResolvedType } from './resolved-type';
import type {
  AbiComponentV1,
  AbiConcreteTypeV1,
  AbiMetadataTypeV1,
  AbiSpecificationV1,
  AbiTypeArgumentV1,
} from './specification';

interface ResolvableComponent {
  name: string;
  type: ResolvableType | ResolvedType;
}

export class ResolvableType {
  private metadataType: AbiMetadataTypeV1;
  swayType: string;
  components: ResolvableComponent[] | undefined;

  constructor(
    private abi: AbiSpecificationV1,
    public metadataTypeId: number,
    public typeParamsArgsMap: Array<[number, ResolvedType | ResolvableType]> | undefined
  ) {
    this.metadataType = this.findMetadataType(metadataTypeId);
    this.swayType = this.metadataType.type;
    this.typeParamsArgsMap ??= this.mapTypeParametersAndArgs(this.metadataType, undefined);
    let components = this.metadataType.components;

    /**
     * Vectors consist of multiple components,
     * but we only care about the `buf`'s first type argument
     * which defines the type of the vector data.
     * Everything else is being ignored,
     * as it's then easier to reason about the vector
     * (you just treat is as a regular struct).
     */
    if (swayTypeMatchers.vector(this.metadataType.type)) {
      components = components?.map((component) => {
        if (component.name === 'buf') {
          return component.typeArguments?.[0];
        }
        return component;
      }) as AbiComponentV1[];
    }

    this.components = components?.map((c) => this.handleComponent(this, c));
  }

  toAbiType(): AbiTypeMetadata {
    return {
      metadataTypeId: this.metadataTypeId,
      components: this.components?.map((component) => ({
        name: component.name,
        type: component.type.toAbiType(),
      })),
      swayType: this.swayType,
      typeParameters: this.typeParamsArgsMap?.map(([, resolvableType]) =>
        (resolvableType as ResolvableType).toAbiType()
      ),
    };
  }

  /**
   * Find a metadata type by its ID.
   * @param metadataTypeId - The ID of the metadata type to find.
   * @returns The metadata type.
   *
   * @throws  If the metadata type can not be found in the ABI.
   */
  private findMetadataType(metadataTypeId: number): AbiMetadataTypeV1 {
    const metadataType = this.abi.metadataTypes.find(
      (type) => type.metadataTypeId === metadataTypeId
    );
    if (!metadataType) {
      throw new FuelError(
        FuelError.CODES.TYPE_NOT_FOUND,
        `Metadata type with id ${metadataTypeId} not found`
      );
    }
    return metadataType;
  }

  /**
   * Find a concrete type by its ID.
   * @param concreteTypeId - The ID of the concrete type to find.
   * @returns The concrete type.
   *
   * @throws  If the concrete type can not be found in the ABI.
   */
  private findConcreteType(concreteTypeId: string): AbiConcreteTypeV1 {
    const concreteType = this.abi.concreteTypes.find(
      (type) => type.concreteTypeId === concreteTypeId
    );
    if (!concreteType) {
      throw new FuelError(
        FuelError.CODES.TYPE_NOT_FOUND,
        `Concrete type with id ${concreteTypeId} not found`
      );
    }
    return concreteType;
  }

  private mapTypeParametersAndArgs(
    metadataType: AbiMetadataTypeV1,
    args: (ResolvableType | ResolvedType)[] | undefined
  ): Array<[number, ResolvedType | ResolvableType]> | undefined {
    if (!args) {
      return metadataType.typeParameters?.map((typeParameter) => [
        typeParameter,
        new ResolvableType(this.abi, typeParameter, undefined),
      ]);
    }

    return metadataType.typeParameters?.map((typeParameter, idx) => [typeParameter, args[idx]]);
  }

  private handleComponent(
    parent: ResolvableType,
    component: AbiComponentV1 | AbiTypeArgumentV1
  ): ResolvableComponent {
    const name = (component as AbiComponentV1).name;

    if (typeof component.typeId === 'string') {
      const concreteType = this.findConcreteType(component.typeId);
      return {
        name,
        type: this.resolveConcreteType(concreteType),
      };
    }

    const metadataType = this.findMetadataType(component.typeId);
    return {
      name,
      type: this.handleMetadataType(parent, metadataType, component.typeArguments),
    };
  }

  /**
   * Concrete types are *resolved* because everything is known about them.
   */
  private resolveConcreteType(type: AbiConcreteTypeV1): ResolvedType {
    if (type.metadataTypeId === undefined) {
      return new ResolvedType({
        swayType: type.type,
        typeId: type.concreteTypeId,
      });
    }

    if (!type.typeArguments) {
      return new ResolvableType(this.abi, type.metadataTypeId, undefined).resolveInternal(
        type.concreteTypeId,
        undefined
      );
    }

    const metadataType = this.findMetadataType(type.metadataTypeId);

    const concreteTypeArgs = type.typeArguments.map((typeArgument) => {
      const concreteTypeArg = this.findConcreteType(typeArgument);
      return this.resolveConcreteType(concreteTypeArg);
    });

    return new ResolvableType(
      this.abi,
      type.metadataTypeId,
      this.mapTypeParametersAndArgs(metadataType, concreteTypeArgs)
    ).resolveInternal(type.concreteTypeId, undefined);
  }

  /**
   * Metadata types are *handled* and not *resolved* because they might be generic,
   * in which case they cannot be resolved.
   * If they're not generic, they can be immediately resolved.
   */
  private handleMetadataType(
    parent: ResolvableType,
    metadataType: AbiMetadataTypeV1,
    typeArguments: AbiComponentV1['typeArguments']
  ): ResolvableType | ResolvedType {
    if (swayTypeMatchers.generic(metadataType.type)) {
      const resolvedTypeParameter = parent.typeParamsArgsMap?.find(
        ([typeParameterId]) => typeParameterId === metadataType.metadataTypeId
      )?.[1];

      return (
        resolvedTypeParameter ??
        new ResolvableType(this.abi, metadataType.metadataTypeId, undefined)
      );
    }

    if (!metadataType.components) {
      /**
       * types like u8, u16 can make their way into metadata types
       * if they aren't used _directly_ in a function-input/function-output/log/configurable/messageType
       * These types are characterized by not having components and we can resolve them as-is
       */
      return new ResolvableType(this.abi, metadataType.metadataTypeId, undefined).resolveInternal(
        metadataType.metadataTypeId,
        undefined
      );
    }

    const typeArgs = typeArguments?.map(
      (typeArgument) => this.handleComponent(parent, typeArgument).type
    );

    const resolvable = new ResolvableType(
      this.abi,
      metadataType.metadataTypeId,
      this.mapTypeParametersAndArgs(metadataType, typeArgs)
    );

    if (typeArgs?.every((typeArgument) => typeArgument instanceof ResolvedType)) {
      return resolvable.resolveInternal(metadataType.metadataTypeId, undefined);
    }

    if (resolvable.components?.every((component) => component.type instanceof ResolvedType)) {
      return resolvable.resolveInternal(metadataType.metadataTypeId, undefined);
    }

    return resolvable;
  }

  private resolveInternal(
    typeId: string | number,
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): ResolvedType {
    const typeArgs = this.resolveTypeArgs(typeParamsArgsMap);

    const components: ResolvedType['components'] = this.components?.map((component) => {
      if (component.type instanceof ResolvedType) {
        return component as { name: string; type: ResolvedType };
      }

      const resolvedGenericType = typeArgs?.find(
        ([typeParameterId]) => (component.type as ResolvableType).metadataTypeId === typeParameterId
      )?.[1];
      if (resolvedGenericType) {
        return {
          name: component.name,
          type: resolvedGenericType,
        };
      }
      return {
        name: component.name,
        type: component.type.resolveInternal(component.type.metadataTypeId, typeArgs),
      };
    });
    return new ResolvedType({
      swayType: this.metadataType.type,
      typeId,
      components,
      typeParamsArgsMap: typeArgs,
      metadataTypeId: this.metadataTypeId,
    });
  }

  private resolveTypeArgs(
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): [number, ResolvedType][] | undefined {
    return this.typeParamsArgsMap === undefined
      ? typeParamsArgsMap
      : this.typeParamsArgsMap.map(([typeParameter, value]) => {
          if (value instanceof ResolvableType) {
            const resolved = typeParamsArgsMap?.find(
              ([typeParameterId]) => typeParameterId === value.metadataTypeId
            );

            return (
              resolved ?? [
                +typeParameter,
                value.resolveInternal(value.metadataTypeId, typeParamsArgsMap),
              ]
            );
          }

          return [+typeParameter, value];
        });
  }

  public resolve(concreteType: AbiConcreteTypeV1) {
    const concreteTypeArgs = concreteType.typeArguments?.map((typeArgument) => {
      const concreteTypeArg = this.findConcreteType(typeArgument);
      return this.resolveConcreteType(concreteTypeArg);
    });

    const typeParamsArgsMap = this.mapTypeParametersAndArgs(
      this.metadataType,
      concreteTypeArgs
    ) as Array<[number, ResolvedType]>;

    return this.resolveInternal(concreteType.concreteTypeId, typeParamsArgsMap);
  }
}
