export interface Abi {
  specVersion: string;
  encodingVersion: string;
  programType: string;
  metadataTypes: AbiTypeMetadata[];
  types: AbiType[];
  functions: AbiFunction[];
  loggedTypes: AbiLoggedType[];
  messageTypes: AbiMessageType[];
  configurables: AbiConfigurable[];
}

export interface AbiType {
  swayType: string;
  concreteTypeId: string;
  components?: AbiTypeComponent[];
  metadata?: {
    metadataTypeId: number;
    typeArguments?: AbiType[];
  };
}

export interface AbiTypeMetadata {
  metadataTypeId: number;
  swayType: string;
  components?: { name: string; type: AbiType | AbiTypeMetadata }[];
  typeParameters?: AbiTypeMetadata[];
}

export interface AbiTypeComponent {
  name: string;
  type: AbiType;
}

export interface AbiFunctionInput {
  name: string;
  type: AbiType;
}

export interface AbiFunction {
  name: string;
  inputs: AbiFunctionInput[];
  output: AbiType;
  attributes?: readonly AbiFunctionAttribute[];
}

export interface AbiLoggedType {
  logId: string;
  type: AbiType;
}

export interface AbiMessageType {
  messageId: string;
  type: AbiType;
}

export interface AbiConfigurable {
  name: string;
  offset: number;
  type: AbiType;
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
