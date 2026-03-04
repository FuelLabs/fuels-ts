import type { IType } from './IType';
import type { JsonAbiFunction } from './JsonAbi';

export interface IFunctionAttributes {
  inputs: string;
  output: string;
  prefixedInputs: string;
}

export interface IFunction {
  types: IType[];
  name: string;
  rawAbiFunction: JsonAbiFunction;
  attributes: IFunctionAttributes;
  getDeclaration(): string;
}
