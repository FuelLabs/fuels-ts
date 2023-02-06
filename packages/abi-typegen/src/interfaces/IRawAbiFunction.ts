export interface IRawAbiFunction {
  name: string;
  inputs: IRawAbiFunctionIO[];
  output: IRawAbiFunctionIO;
  attributes: IRawAbiFunctionAttribute[];
}

export interface IRawAbiFunctionIO {
  name: string;
  type: number;
  typeArguments: null | IRawAbiFunctionIO[];
}

export interface IRawAbiFunctionAttribute {
  name: string;
  arguments: string[];
}
