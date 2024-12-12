import { FuelError } from '@fuel-ts/errors';

import { swayTypeMatchers } from '../../../matchers/sway-type-matchers';
import type { AbiConcreteType, AbiTypeComponent, AbiMetadataType } from '../../abi';

import type { ResolvedComponent } from './resolved-type';
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
    this.typeParamsArgsMap ??= this.metadataType.typeParameters?.map((tp) => [
      tp,
      new ResolvableType(this.abi, tp, undefined),
    ]);

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
      components = components
        ?.map((component) => (component.name === 'buf' ? component.typeArguments?.[0] : undefined))
        .filter((x) => x !== undefined) as AbiComponentV1[];
    }

    this.components = components?.map((c) => this.handleComponent(this, c));
  }

  toComponentType(): AbiTypeComponent['type'] {
    const result: AbiTypeComponent['type'] = {
      swayType: this.swayType,
      metadata: {
        metadataTypeId: this.metadataTypeId,
      },
    };

    if (this.components) {
      result.components = this.components.map((component) => ({
        name: component.name,
        type: component.type.toComponentType(),
      }));
    }
    if (this.typeParamsArgsMap) {
      result.metadata.typeArguments = this.typeParamsArgsMap.map(
        ([, rt]) => rt.toAbiType() as AbiConcreteType
      );
    }

    return result;
  }

  toAbiType(): AbiMetadataType {
    const result: AbiMetadataType = {
      metadataTypeId: this.metadataTypeId,
      swayType: this.swayType,
    };

    if (this.components) {
      result.components = this.components?.map((component) => ({
        name: component.name,
        type: component.type.toComponentType(),
      })) as AbiTypeComponent[];
    }

    if (this.typeParamsArgsMap) {
      result.typeParameters = this.typeParamsArgsMap.map(
        ([, rt]) => rt.toAbiType() as AbiMetadataType
      );
    }

    return result;
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

  private static mapTypeParametersAndArgs(
    metadataType: AbiMetadataTypeV1,
    args: (ResolvableType | ResolvedType)[]
  ): Array<[number, ResolvedType | ResolvableType]> | undefined {
    return metadataType.typeParameters?.map((typeParameter, idx) => [typeParameter, args[idx]]);
  }

  private handleComponent(
    parent: ResolvableType,
    component: AbiComponentV1 | AbiTypeArgumentV1
  ): ResolvableComponent {
    const name = (component as AbiComponentV1).name;

    const isConcreteType = typeof component.typeId === 'string';

    if (isConcreteType) {
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
    /**
     * If the concrete type doesn't have a linked metadata type, we can resolve it immediately.
     * This is the case for e.g. u8, u16, ...
     */
    if (type.metadataTypeId === undefined) {
      return new ResolvedType({
        swayType: type.type,
        typeId: type.concreteTypeId,
      });
    }
    /**
     * The concrete type has an associated metadata type.
     * If it's not generic (no type arguments),
     * we'll create a ResolvableType with that metadata type, and then resolve it immediately.
     * This would be the case for e.g. non-generic structs and enums.
     */
    if (!type.typeArguments) {
      return new ResolvableType(this.abi, type.metadataTypeId, undefined).resolveInternal(
        type.concreteTypeId,
        undefined
      );
    }

    /**
     * The concrete type's underlying metadata type is generic.
     * We must resolve all its type parameters with the provided type arguments of the concrete type,
     * and then resolve the metadata type itself.
     */
    const metadataType = this.findMetadataType(type.metadataTypeId);

    const concreteTypeArgs = type.typeArguments.map((typeArgument) => {
      const concreteTypeArg = this.findConcreteType(typeArgument);
      return this.resolveConcreteType(concreteTypeArg);
    });

    return new ResolvableType(
      this.abi,
      type.metadataTypeId,
      ResolvableType.mapTypeParametersAndArgs(metadataType, concreteTypeArgs)
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
    /**
     * If the type is generic, we can't resolve it and thus we create a `ResolvableType` from it.
     * This propagates to the parent type, forcing it to be a `ResolvableType` as well,
     * as it can't be resolved until this generic type is substituted with a type argument.
     */
    if (swayTypeMatchers.generic(metadataType.type)) {
      /**
       * This search solves the case where an e.g. `generic T` is being substituted by `generic E`.
       * This can happen when a generic type is nested in another generic type and they have differently-named type parameters.
       * e.g. `GenericStruct<E>` is nested in `Vec<T>`: `struct MyStruct<A> { a: Vec<GenericStruct<A> }`
       * We check in the parent's typeParamsArgsMap if the metadata type we're solving for
       * has been substituted with a different generic type, and then we use that generic type.
       */
      const resolvableTypeParameter = parent.typeParamsArgsMap?.find(
        ([typeParameterId]) => typeParameterId === metadataType.metadataTypeId
      )?.[1];

      return (
        resolvableTypeParameter ??
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
      !typeArgs?.length
        ? undefined
        : ResolvableType.mapTypeParametersAndArgs(metadataType, typeArgs)
    );

    /**
     * If any component is unresolved, this means that the metadata type is generic.
     * We can't resolve it yet, so we return the resolvable type.
     * If all components are resolved, we can resolve the metadata type immediately.
     */
    const isGeneric = resolvable.components?.some(
      (component) => component.type instanceof ResolvableType
    );

    return isGeneric
      ? resolvable
      : resolvable.resolveInternal(metadataType.metadataTypeId, undefined);
  }

  private resolveInternal(
    typeId: string | number,
    typeParamsArgsMap: Array<[number, ResolvedType]> | undefined
  ): ResolvedType {
    const resolvedType = new ResolvedType({
      swayType: this.swayType,
      typeId,
      metadataType: this.metadataType,
    });

    /**
     * A type without components can be immediately resolved.
     */
    if (!this.components) {
      return resolvedType;
    }

    /**
     * If typeParamsArgsMap is undefined,
     * this means that the underlying metadata type's components are already fully resolved,
     * as it doesn't need any external typeArgs to substitute those components with.
     */
    if (typeParamsArgsMap === undefined) {
      resolvedType.components = this.components as ResolvedComponent[];
      resolvedType.typeParamsArgsMap = this.typeParamsArgsMap as [number, ResolvedType][];
      return resolvedType;
    }

    /**
     * Before resolving the components,
     * we need to substitute the type parameters of the underlying metadata type
     * with the type arguments of the concrete type,
     * so that we can substitute the generic components with them later.
     */
    const typeArgs = this.resolveTypeArgs(typeParamsArgsMap);

    const components: ResolvedComponent[] = this.components.map((component) => {
      const { name, type } = component;

      if (type instanceof ResolvedType) {
        return component as ResolvedComponent;
      }

      /**
       * Here the component's type is a `ResolvableType`.
       * If the component is a generic type parameter itself, its corresponding type argument will be found in the typeArgs,
       * which will be used to substitute the component with.
       */
      const resolvedGenericType = typeArgs?.find(
        ([typeParameterId]) => type.metadataTypeId === typeParameterId
      )?.[1];

      if (resolvedGenericType) {
        return {
          name,
          type: resolvedGenericType,
        };
      }

      return {
        name,
        /**
         * The component is a `ResolvableType`, but it's not a generic type parameter itself.
         * This means that one of its components (or component's components ad infinitum) is a generic type.
         * We need to resolve that first before resolving the component.
         *
         * Note that we are passing in the original `typeParamsArgsMap`,
         * which will be used to substitute the component's generic type parameters with their type arguments.
         */
        type: type.resolveInternal(type.metadataTypeId, typeParamsArgsMap),
      };
    });

    resolvedType.components = components;
    resolvedType.typeParamsArgsMap = typeArgs;

    return resolvedType;
  }

  private resolveTypeArgs(
    typeParamsArgsMap: Array<[number, ResolvedType]>
  ): [number, ResolvedType][] {
    if (this.typeParamsArgsMap === undefined) {
      return typeParamsArgsMap;
    }

    return this.typeParamsArgsMap.map(([tp, value]) => {
      if (value instanceof ResolvedType) {
        return [tp, value];
      }
      const resolved = typeParamsArgsMap?.find(
        ([typeParameterId]) => typeParameterId === value.metadataTypeId
      );

      if (!resolved) {
        const val = value.resolveInternal(value.metadataTypeId, typeParamsArgsMap);
        return [tp, val];
      }

      return resolved;
    });
  }

  public resolve(concreteType: AbiConcreteTypeV1) {
    const concreteTypeArgs = concreteType.typeArguments?.map((typeArgument) => {
      const concreteTypeArg = this.findConcreteType(typeArgument);
      return this.resolveConcreteType(concreteTypeArg);
    });

    const typeParamsArgsMap = concreteTypeArgs
      ? (ResolvableType.mapTypeParametersAndArgs(this.metadataType, concreteTypeArgs) as Array<
          [number, ResolvedType]
        >)
      : undefined;

    return this.resolveInternal(concreteType.concreteTypeId, typeParamsArgsMap);
  }
}
