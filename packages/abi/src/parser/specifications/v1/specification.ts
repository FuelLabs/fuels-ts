/**
 * Types for Fuel JSON ABI Format specification v1, as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/json-abi-format.md
 */
export interface AbiSpecificationV1 {
  readonly specVersion: '1';
  readonly encodingVersion: string;
  readonly programType: string;
  readonly concreteTypes: readonly AbiConcreteTypeV1[];
  readonly metadataTypes: readonly AbiMetadataTypeV1[];
  readonly functions: readonly AbiFunctionV1[];
  readonly loggedTypes: readonly AbiLoggedTypeV1[];
  readonly messagesTypes: readonly AbiMessageTypeV1[];
  readonly configurables: readonly AbiConfigurableV1[];
}

export interface AbiConcreteTypeV1 {
  readonly type: string;
  readonly concreteTypeId: string;
  readonly metadataTypeId?: number;
  readonly typeArguments?: readonly string[];
}

export interface AbiMetadataTypeV1 {
  readonly type: string;
  readonly metadataTypeId: number;
  readonly components?: readonly AbiComponentV1[];
  readonly typeParameters?: readonly number[];
}

export interface AbiComponentV1 extends AbiTypeArgumentV1 {
  readonly name: string;
}

export interface AbiTypeArgumentV1 {
  readonly typeId: number | string; // the type metadata declaration ID or type concrete declaration hash based ID of the type of the component.
  readonly typeArguments?: readonly AbiTypeArgumentV1[];
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

export interface AbiLoggedTypeV1 {
  readonly logId: string;
  // the _type concrete declaration_ hash based ID of the value being logged.
  readonly concreteTypeId: string;
}

export interface AbiMessageTypeV1 {
  readonly messageId: string;
  readonly concreteTypeId: string;
}
export interface AbiConfigurableV1 {
  readonly name: string;
  readonly concreteTypeId: string;
  readonly offset: number;
}

export type AbiFunctionAttributeV1 =
  | StorageAttrV1
  | PayableAttrV1
  | TestAttrV1
  | InlineAttrV1
  | DocCommentAttrV1;

export interface PayableAttrV1 {
  readonly name: 'payable';
  readonly arguments?: readonly [];
}

export interface StorageAttrV1 {
  readonly name: 'storage';
  readonly arguments: readonly ('read' | 'write')[];
}

export interface TestAttrV1 {
  readonly name: 'test';
  readonly arguments?: readonly [];
}

export interface InlineAttrV1 {
  readonly name: 'inline';
  readonly arguments: 'never' | 'always';
}

export interface DocCommentAttrV1 {
  readonly name: 'doc-comment';
  readonly arguments: string[];
}
