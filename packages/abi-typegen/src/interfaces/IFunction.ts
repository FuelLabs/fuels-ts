import type { IRawAbiFunction } from './IRawAbiFunction';
import type { IType } from './IType';

export interface IFunctionAttributes {
  name: string;
  inputs: string;
  output: string;
}

export interface IFunction {
  types: IType[];
  rawAbiFunction: IRawAbiFunction;
  attributes: IFunctionAttributes;
  getDeclaration(): string;
}
