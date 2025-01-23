import { FuelError } from '@fuel-ts/errors';

import { swayTypeMatchers } from '../../../matchers/sway-type-matchers';

import type { ResolvedComponent } from './resolved-type';
import { ResolvedType } from './resolved-type';
import type {
  AbiComponentV1,
  AbiConcreteTypeV1,
  AbiMetadataTypeV1,
  AbiTypeArgumentV1,
} from './specification';

export interface ResolvableComponent {
  name: string;
  type: ResolvableType | ResolvedType;
}

export class ResolvableType {
  metadataType: AbiMetadataTypeV1;
  swayType: string;
  components: ResolvableComponent[] | undefined;

  constructor(
    private abiTypeMaps: {
      metadataTypes: Map<number, AbiMetadataTypeV1>;
      concreteTypes: Map<string, AbiConcreteTypeV1>;
    },
    public metadataTypeId: number,
    public typeParamsArgsMap: Map<number, ResolvedType | ResolvableType> | undefined
  ) {
    this.metadataType = this.findMetadataType(metadataTypeId);
    this.swayType = this.metadataType.type;
    this.typeParamsArgsMap ??=
      this.metadataType.typeParameters &&
      new Map(
        this.metadataType.typeParameters.map((typeParameter) => [
          typeParameter,
          new ResolvableType(this.abiTypeMaps, typeParameter, undefined),
        ])
      );

    this.components = this.metadataType.components?.map((c) =>
      this.createResolvableComponent(this, c)
    );
  }

  /**
   * Find a metadata type by its ID.
   * @param metadataTypeId - The ID of the metadata type to find.
   * @returns The metadata type.
   *
   * @throws  If the metadata type can not be found in the ABI.
   */
  private findMetadataType(metadataTypeId: number): AbiMetadataTypeV1 {
    const metadataType = this.abiTypeMaps.metadataTypes.get(metadataTypeId);

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
    const concreteType = this.abiTypeMaps.concreteTypes.get(concreteTypeId);

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
  ): Map<number, ResolvedType | ResolvableType> | undefined {
    return (
      metadataType.typeParameters &&
      new Map<number, ResolvedType | ResolvableType>(
        metadataType.typeParameters.map((typeParameter, idx) => [typeParameter, args[idx]])
      )
    );
  }

  private createResolvableComponent(
    parent: ResolvableType,
    { typeId, typeArguments, name }: AbiComponentV1 | AbiTypeArgumentV1
  ): ResolvableComponent {
    const isConcreteType = typeof typeId === 'string';

    if (isConcreteType) {
      const concreteType = this.findConcreteType(typeId);
      return {
        name,
        type: this.resolveConcreteType(concreteType),
      };
    }

    const metadataType = this.findMetadataType(typeId);
    return {
      name,
      type: this.handleMetadataType(parent, metadataType, typeArguments),
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
      return new ResolvableType(this.abiTypeMaps, type.metadataTypeId, undefined).resolveInternal(
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
      this.abiTypeMaps,
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
    if (swayTypeMatchers.generic({ swayType: metadataType.type })) {
      /**
       * This search solves the case where an e.g. `generic T` is being substituted by `generic E`.
       * This can happen when a generic type is nested in another generic type and they have differently-named type parameters.
       * e.g. `GenericStruct<E>` is nested in `Vec<T>`: `struct MyStruct<A> { a: Vec<GenericStruct<A> }`
       * We check in the parent's typeParamsArgsMap if the metadata type we're solving for
       * has been substituted with a different generic type, and then we use that generic type.
       */
      const resolvableTypeParameter = parent.typeParamsArgsMap?.get(metadataType.metadataTypeId);

      return (
        resolvableTypeParameter ??
        new ResolvableType(this.abiTypeMaps, metadataType.metadataTypeId, undefined)
      );
    }

    if (!metadataType.components) {
      /**
       * types like u8, u16 can make their way into metadata types
       * if they aren't used _directly_ in a function-input/function-output/log/configurable/messageType
       * These types are characterized by not having components and we can resolve them as-is
       */
      return new ResolvableType(
        this.abiTypeMaps,
        metadataType.metadataTypeId,
        undefined
      ).resolveInternal(metadataType.metadataTypeId, undefined);
    }

    const typeArgs = typeArguments?.map(
      (typeArgument) => this.createResolvableComponent(parent, typeArgument).type
    );

    const resolvable = new ResolvableType(
      this.abiTypeMaps,
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
    typeParamsArgsMap: Map<number, ResolvedType> | undefined
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
       * If the component is a generic type parameter itself,
       * its corresponding type argument will be found in the typeArgs,
       * which will be used to substitute the component with.
       */
      const resolvedGenericType = typeArgs?.get(type.metadataTypeId);

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
         * This means that one of its components (or component's components)
         * is a generic type.
         * We need to resolve that first before resolving the component.
         *
         * Note that we are passing in the original `typeParamsArgsMap` by default,
         * which will be used to substitute the component's generic type parameters
         * with the appropriate type arguments.
         *
         * The non-default case of passing `typeArgs` happens only for tuples/arrays
         * which contain structs with implicit generics,
         * e.g. `(bool, StructWithImplicitGenerics<bool, b256>)`
         */
        type: type.resolveInternal(type.metadataTypeId, typeParamsArgsMap ?? typeArgs),
      };
    });

    resolvedType.components = components;
    resolvedType.typeParamsArgsMap = typeArgs;

    return resolvedType;
  }

  private resolveTypeArgs(
    typeParamsArgsMap: Map<number, ResolvedType> | undefined
  ): Map<number, ResolvedType> | undefined {
    /**
     * This case only happens when the metadata type is *implicitly* generic.
     * The type itself doesn't have any type parameters that should be resolved,
     * but its components are still generic types.
     * This happens in the following type:
     * `struct StructWithImplicitGenerics<E, F> { a: [E; 3], b: (E, F)}`.
     */
    if (this.typeParamsArgsMap === undefined) {
      return typeParamsArgsMap;
    }

    const newMap = new Map<number, ResolvedType>();

    /**
     * We resolve the type parameters of the underlying metadata type
     * with the type arguments of the concrete type.
     */
    this.typeParamsArgsMap.forEach((arg, typeParameter) => {
      /**
       * Some type parameters can already be resolved
       * e.g. `struct MyStruct<E> { a: DoubleGeneric<E, u16> }`
       * where the second type parameter of DoubleGeneric is already known.
       */
      if (arg instanceof ResolvedType) {
        newMap.set(typeParameter, arg);
        return;
      }

      /**
       * The type parameter is either directly substituted with a type argument,
       * or it's a metadata type which accepts the type argument,
       * so that metadata type will be resolved and subsitute the type parameter.
       */
      const resolved =
        typeParamsArgsMap?.get(arg.metadataTypeId) ??
        arg.resolveInternal(arg.metadataTypeId, typeParamsArgsMap);

      newMap.set(arg.metadataTypeId, resolved);
    });

    return newMap;
  }

  /**
   * Resolves the instance of `ResolvableType` with the specific concrete type's data.
   * @returns a `ResolvedType` in which all its components are resolved.
   */
  public resolve(concreteType: AbiConcreteTypeV1): ResolvedType {
    const concreteTypeArgs = concreteType.typeArguments?.map((typeArgument) => {
      const concreteTypeArg = this.findConcreteType(typeArgument);
      return this.resolveConcreteType(concreteTypeArg);
    });

    const typeParamsArgsMap = concreteTypeArgs
      ? (ResolvableType.mapTypeParametersAndArgs(this.metadataType, concreteTypeArgs) as Map<
          number,
          ResolvedType
        >)
      : undefined;

    return this.resolveInternal(concreteType.concreteTypeId, typeParamsArgsMap);
  }
}
