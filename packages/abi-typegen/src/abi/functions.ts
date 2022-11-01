import { Function } from './functions/Function';
import type { IRawAbiFunction } from './interfaces/IAbiFunction';
import type { IType } from './interfaces/IType';

export function makeFunction(params: { types: IType[]; abiFunction: IRawAbiFunction }) {
  const { types, abiFunction } = params;
  return new Function({ types, abiFunction });
}

export function parseFunctions(params: { types: IType[]; abiFunctions: IRawAbiFunction[] }) {
  const { types, abiFunctions } = params;
  const functions = abiFunctions.map((abiFunction) => makeFunction({ types, abiFunction }));
  return functions;
}
