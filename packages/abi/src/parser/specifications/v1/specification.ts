/**
 * Types for Fuel JSON ABI Format specification v1, as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/json-abi-format.md
 */

export interface AbiSpecificationV1 {
  readonly specVersion: '1';
  readonly encodingVersion: string;
  readonly programType: string;
  readonly concreteTypes: readonly ConcreteTypeV1[];
  readonly metadataTypes: readonly MetadataTypeV1[];
  readonly functions: readonly AbiFunctionV1[];
  readonly loggedTypes: readonly LoggedTypeV1[];
  readonly messagesTypes: readonly MessageTypeV1[];
  readonly configurables: readonly ConfigurableV1[];
}

export interface ConcreteTypeV1 {
  readonly type: string;
  readonly concreteTypeId: string;
  readonly metadataTypeId?: number;
  readonly typeArguments?: readonly string[];
}

export interface MetadataTypeV1 {
  readonly type: string;
  readonly metadataTypeId: number;
  readonly components?: readonly ComponentV1[];
  readonly typeParameters?: readonly number[];
}

export interface ComponentV1 extends TypeArgumentV1 {
  readonly name: string;
}

export interface TypeArgumentV1 {
  readonly typeId: number | string; // the type metadata declaration ID or type concrete declaration hash based ID of the type of the component.
  readonly typeArguments?: readonly TypeArgumentV1[];
}

export interface AbiFunctionV1 {
  readonly name: string;
  readonly inputs: readonly AbiFunctionInputV1[];
  readonly output: string;
  readonly attributes: readonly AbiFunctionAttributeV1[] | null;
}

export interface AbiFunctionInputV1 {
  readonly name: string;
  readonly concreteTypeId: string;
}

export interface LoggedTypeV1 {
  readonly logId: string;
  // the _type concrete declaration_ hash based ID of the value being logged.
  readonly concreteTypeId: string;
}

export interface MessageTypeV1 {
  readonly messageId: string;
  readonly concreteTypeId: string;
}
export interface ConfigurableV1 {
  readonly name: string;
  readonly concreteTypeId: string;
  readonly offset: number;
}

export type AbiFunctionAttributeV1 =
  | StorageAttrV1
  | PayableAttrV1
  | TestAttrV1
  | InlineAttrV1
  | DocCommentAttrV1
  | DocAttrV1;

export interface PayableAttrV1 {
  readonly name: 'payable';
}

export interface StorageAttrV1 {
  readonly name: 'storage';
  readonly arguments: readonly ('read' | 'write')[];
}

export interface TestAttrV1 {
  readonly name: 'test';
}

export interface InlineAttrV1 {
  readonly name: 'inline';
  readonly arguments: 'never' | 'always';
}

export interface DocCommentAttrV1 {
  readonly name: 'doc-comment';
  readonly arguments: string[];
}
export interface DocAttrV1 {
  readonly name: 'doc';
}
