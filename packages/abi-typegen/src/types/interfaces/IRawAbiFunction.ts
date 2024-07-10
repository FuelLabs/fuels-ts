export interface JsonAbiFunction {
  name: string;
  inputs: IRawAbiFunctionIO[];
  output: IRawAbiFunctionIO;
}

export interface IRawAbiFunctionIO {
  name: string;
  type: number;
  typeArguments: null | IRawAbiFunctionIO[];
}
