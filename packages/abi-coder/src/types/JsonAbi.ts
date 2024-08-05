/**
 * Types for Fuel JSON ABI Format as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/b40d87d2515727188b9ae2dd23602316c50519c0/src/abi/json-abi-format.md
 */
export interface JsonAbiOld {
  readonly types: readonly JsonAbiType[];
  readonly loggedTypes: readonly JsonAbiLoggedType[];
  readonly functions: readonly JsonAbiFunction[];
  readonly messagesTypes: readonly JsonAbiMessagesType[];
  readonly configurables: readonly JsonAbiConfigurable[];
  readonly encoding?: string;
}

export interface JsonAbiType {
  readonly typeId: number;
  readonly type: string;
  readonly components: readonly JsonAbiArgument[] | null;
  readonly typeParameters: readonly number[] | null;
}

export interface JsonAbiArgument {
  readonly type: number;
  readonly name: string;
  readonly typeArguments: readonly JsonAbiArgument[] | null;
}

export interface JsonAbiArgumentWithoutName {
  readonly type: number;
  readonly typeArguments: readonly JsonAbiArgumentWithoutName[] | null;
}

export interface JsonAbiLoggedType {
  readonly logId: string;
  readonly loggedType: JsonAbiArgument;
}

export interface JsonAbiMessagesType {
  readonly messageDataType: JsonAbiArgumentWithoutName;
}

export interface JsonAbiFunction {
  readonly name: string;
  readonly inputs: readonly JsonAbiArgument[];
  readonly output: JsonAbiArgument;
  readonly attributes: readonly JsonAbiFunctionAttribute[] | null;
}

export interface JsonAbiFunctionAttribute {
  readonly name: string;
  readonly arguments: ReadonlyArray<string>;
}

export interface JsonAbiConfigurable {
  name: string;
  configurableType: JsonAbiArgument;
  offset: number;
}
