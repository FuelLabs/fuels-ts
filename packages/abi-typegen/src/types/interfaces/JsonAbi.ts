/**
 * Types for Fuel JSON ABI Format as defined on:
 * https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/json-abi-format.md
 */
export interface JsonAbi {
  readonly types: readonly JsonAbiType[];
  readonly loggedTypes: readonly JsonAbiLoggedType[];
  readonly functions: readonly JsonAbiFunction[];
  readonly messagesTypes: readonly JsonAbiMessagesType[];
  readonly configurables: readonly JsonAbiConfigurable[];
  readonly encoding?: string;
  readonly specVersion: string;
  readonly abiVersion: string;
}

export interface JsonAbiType {
  readonly typeId: string;
  readonly type: string;
  readonly components: readonly JsonAbiArgument[] | null;
  readonly typeParameters: readonly string[] | null;
}

export interface JsonAbiArgument {
  readonly name: string;
  readonly type: string;
  readonly typeArguments: readonly JsonAbiArgumentWithoutName[] | null;
}

export interface JsonAbiArgumentWithoutName {
  readonly type: string;
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
  readonly output: JsonAbiArgumentWithoutName;
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
