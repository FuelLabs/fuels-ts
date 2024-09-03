/**
 * Types for Fuel JSON ABI Format specification v1, as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/json-abi-format.md
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface JsonAbi_V1 {
  readonly specVersion: string;
  readonly encodingVersion: string;
  readonly programType: string;
  readonly concreteTypes: readonly ConcreteType[];
  readonly metadataTypes: readonly MetadataType[];
  readonly functions: readonly AbiFunction[];
  readonly loggedTypes: readonly LoggedType[];
  readonly messagesTypes: readonly MessageType[];
  readonly configurables: readonly Configurable[];
}

export interface ConcreteType {
  readonly type: string;
  readonly concreteTypeId: string;
  readonly metadataTypeId?: number;
  readonly typeArguments?: readonly string[];
}

export interface MetadataType {
  readonly type: string;
  readonly metadataTypeId: number;
  readonly components?: readonly Component[];
  readonly typeParameters?: readonly number[];
}

export interface Component extends TypeArgument {
  readonly name: string;
}

export interface TypeArgument {
  readonly typeId: number | string; // the type metadata declaration ID or type concrete declaration hash based ID of the type of the component.
  readonly typeArguments?: readonly TypeArgument[];
}

export interface AbiFunction {
  readonly name: string;
  readonly inputs: readonly AbiFunctionInput[];
  readonly output: string;
  readonly attributes: readonly AbiFunctionAttributeTodo[] | null;
}

export interface AbiFunctionInput {
  readonly name: string;
  readonly concreteTypeId: string;
}

type AbiFunctionAttributeTodo =
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

export interface LoggedType {
  readonly logId: string;
  readonly concreteTypeId: string; // the _type concrete declaration_ hash based ID of the value being logged.
}

export interface MessageType {
  readonly message_id: string;
  readonly concreteTypeId: string;
}
export interface Configurable {
  readonly name: string;
  readonly concreteTypeId: string;
  readonly offset: number;
}
