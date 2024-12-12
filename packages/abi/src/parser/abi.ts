/**
 * This interface serves as a representation of the ABI file format
 * which won't be changing with the introduction of new abi specifications.
 *
 */
export interface Abi {
  encodingVersion: string;
  programType: string;
  metadataTypes: AbiMetadataType[];
  concreteTypes: AbiConcreteType[];
  functions: AbiFunction[];
  loggedTypes: AbiLoggedType[];
  messageTypes: AbiMessageType[];
  configurables: AbiConfigurable[];
}

export interface AbiConcreteType {
  swayType: string;
  concreteTypeId: string;
  components?: AbiTypeComponent[];
  metadata?: {
    metadataTypeId: number;
    typeArguments?: AbiConcreteType[];
  };
}

export interface AbiMetadataType {
  swayType: string;
  metadataTypeId: number;
  components?: AbiTypeComponent[];
  typeParameters?: AbiMetadataType[];
}

export interface AbiTypeComponent {
  name: string;
  type: AbiConcreteType | AbiMetadataComponent;
}

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
