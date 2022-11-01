import type { IRawAbiFunction } from './IRawAbiFunction';
import type { IType } from './IType';

export interface IFunctionPieces {
  name: string;
  inputs: string;
  output: string;
}

export interface IFunction {
  types: IType[];
  abiFunction: IRawAbiFunction;
  attributes: IFunctionPieces;
  getDeclaration(): string;
}
