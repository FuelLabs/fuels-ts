export interface Abi {
  specVersion: string;
  encodingVersion: string;
  programType: string;

  functions: AbiFunction[];
  loggedTypes: AbiLoggedType[];
  messagesTypes: AbiMessageType[];
  configurables: AbiConfigurable[];
}

export interface AbiType {
  // Concrete type ID
  typeId: string;
  // This will reference the metadata type
  // Fallback to concrete type when no metadata type is referenced (i.e. for built in types)
  swayType: string;
  components?: AbiTypeComponent[];

  // For debugging purposes
  [key: string]: unknown;
}

export interface AbiTypeComponent {
  name: string;
  type: AbiType;

  // For debugging purposes
  [key: string]: unknown;
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
  | DocCommentAttr
  | DocAttr;

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
  readonly arguments: string[];
}

export interface DocAttr {
  readonly name: 'doc';
}
