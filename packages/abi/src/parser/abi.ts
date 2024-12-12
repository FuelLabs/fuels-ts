/**
 * This interface serves as a representation of the ABI format outputted by `forc build`
 * that won't be changing with the introduction of new abi specifications in Sway.
 * Its purpose is to provide a stable interface for users to work with,
 * which won't be affected by changing ABI specification versions.
 */
export interface Abi {
  encodingVersion: string;
  programType: 'contract' | 'predicate' | 'script' | 'library';
  /**
   * Metadata types describe the structure of the types used in the `concreteTypes` field.
   * One metadata type can be referenced multiple times if it is used in multiple concrete types.
   */
  metadataTypes: AbiMetadataType[];
  /**
   * Concrete types are types that are used in:
   * function inputs/outputs, configurables, logged types, or message types.
   *
   * Their structure is fully known and they do not contain any unresolved generic parameters.
   */
  concreteTypes: AbiConcreteType[];
  functions: AbiFunction[];
  loggedTypes: AbiLoggedType[];
  messageTypes: AbiMessageType[];
  configurables: AbiConfigurable[];
}

export interface AbiConcreteType {
  swayType: string;
  concreteTypeId: string;
  /**
   * The components field is populated when the type is any non-primitive type.
   * That includes structs, enums, arrays, and tuples.
   */
  components?: AbiTypeComponent[];
  /**
   * A concrete type can be an implementation of a metadata type,
   * in which case the `metadata` field is populated.
   * If the underlying metadata type has type parameters (is generic),
   * the `typeArguments` field corresponds to those type parameters.
   */
  metadata?: {
    metadataTypeId: number;
    /**
     * Type arguments used to resolve the type parameters in the metadata type.
     * They are ordered in the same way as the type parameters in the metadata type.
     */
    typeArguments?: AbiConcreteType[];
  };
}

export interface AbiMetadataType {
  swayType: string;
  metadataTypeId: number;
  /**
   * The components field is populated when the type is any non-primitive type.
   * That includes structs, enums, arrays, and tuples.
   */
  components?: AbiTypeComponent[];
  /**
   * The existence of type parameters indicates that the metadata type is generic.
   */
  typeParameters?: AbiMetadataType[];
}

export interface AbiTypeComponent {
  name: string;
  type: AbiConcreteType | AbiMetadataComponent;
}

/**
 * AbiMetadataComponents point to a metadata type but aren't the same,
 * as the metadata type describes the structure of the type,
 * whereas the component is an actual implementation of that type.
 */
export interface AbiMetadataComponent {
  swayType: string;
  components?: AbiTypeComponent[];
  metadata: {
    metadataTypeId: number;
    typeArguments?: AbiConcreteType[];
  };
}

export interface AbiFunctionInput {
  name: string;
  type: AbiConcreteType;
}

export interface AbiFunction {
  name: string;
  inputs: AbiFunctionInput[];
  output: AbiConcreteType;
  attributes?: readonly AbiFunctionAttribute[];
}

export interface AbiLoggedType {
  logId: string;
  type: AbiConcreteType;
}

export interface AbiMessageType {
  messageId: string;
  type: AbiConcreteType;
}

export interface AbiConfigurable {
  name: string;
  offset: number;
  type: AbiConcreteType;
}

export type AbiFunctionAttribute =
  | StorageAttr
  | PayableAttr
  | TestAttr
  | InlineAttr
  | DocCommentAttr;

export interface PayableAttr {
  readonly name: 'payable';
}

export interface StorageAttr {
  readonly name: 'storage';
  readonly arguments: readonly ('read' | 'write')[];
}

export interface TestAttr {
  readonly name: 'test';
}
export interface InlineAttr {
  readonly name: 'inline';
  readonly arguments: 'never' | 'always';
}

export interface DocCommentAttr {
  readonly name: 'doc-comment';
  readonly arguments: readonly string[];
}
