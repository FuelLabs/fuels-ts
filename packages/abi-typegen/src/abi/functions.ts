import { Function } from './functions/Function';
import type { IAbiFunction } from './interfaces/IAbiFunction';
import type { IType } from './interfaces/IType';

export function makeFunction(params: { types: IType[]; abiFunction: IAbiFunction }) {
  const { types, abiFunction } = params;
  return new Function({ types, abiFunction });
}

export function parseFunctions(params: { types: IType[]; abiFunctions: IAbiFunction[] }) {
  const { types, abiFunctions } = params;
  const functions = abiFunctions.map((abiFunction) => makeFunction({ types, abiFunction }));
  return functions;
}
