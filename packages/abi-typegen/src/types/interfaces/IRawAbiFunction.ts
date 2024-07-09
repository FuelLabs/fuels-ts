export interface IRawAbiFunction {
  attributes: readonly JsonAbiFunctionAttribute[] | null;
  name: string;
  inputs: IRawAbiFunctionIO[];
  output: IRawAbiFunctionIO;
}

export interface IRawAbiFunctionIO {
  name: string;
  type: number;
  typeArguments: null | IRawAbiFunctionIO[];
}

export interface JsonAbiFunctionAttribute {
  readonly name: string;
  readonly arguments: ReadonlyArray<string>;
}
