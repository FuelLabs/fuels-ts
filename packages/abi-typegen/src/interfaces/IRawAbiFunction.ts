export interface IRawAbiFunction {
  name: string;
  inputs: IRawAbiFunctionIO[];
  output: IRawAbiFunctionIO;
}

export interface IRawAbiFunctionIO {
  name: string;
  type: number;
  typeArguments: null | IRawAbiFunctionIO[];
}
