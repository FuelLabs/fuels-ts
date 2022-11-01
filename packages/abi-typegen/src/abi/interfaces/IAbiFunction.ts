export interface IAbiFunction {
  name: string;
  inputs: IAbiFunctionIO[];
  output: IAbiFunctionIO;
}

export interface IAbiFunctionIO {
  name: string;
  type: number;
  typeArguments: null | IAbiFunctionIO[];
}
