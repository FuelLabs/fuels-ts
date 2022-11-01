import type { IAbiFunction } from './IAbiFunction';
import type { IType } from './IType';

export interface IFunctionPieces {
  name: string;
  inputs: string;
  output: string;
}

export interface IFunction {
  types: IType[];
  abiFunction: IAbiFunction;
  attributes: IFunctionPieces;
  getDeclaration(): string;
}
