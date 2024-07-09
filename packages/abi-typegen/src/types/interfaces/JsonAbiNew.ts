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
  readonly components: readonly JsonAbiComponent[] | null;
  readonly typeParameters: readonly string[] | null;
}

export interface JsonAbiComponent extends JsonAbiArgument {
  readonly name: string;
}

export interface JsonAbiArgument {
  readonly type: string;
  readonly typeArguments: readonly JsonAbiArgument[] | null;
}

export interface JsonAbiLoggedType {
  readonly logId: string;
  readonly loggedType: JsonAbiArgument;
}

export interface JsonAbiMessagesType {
  readonly messageDataType: JsonAbiArgument;
}

export interface JsonAbiFunction {
  readonly name: string;
  readonly inputs: readonly JsonAbiComponent[];
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
