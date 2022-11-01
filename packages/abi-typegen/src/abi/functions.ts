import { Function } from './functions/Function';
import type { IFunction } from './interfaces/IFunction';
import type { IRawAbiFunction } from './interfaces/IRawAbiFunction';
import type { IType } from './interfaces/IType';

export function makeFunction(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
  const { types, rawAbiFunction } = params;
  return new Function({ types, rawAbiFunction });
}

export function parseFunctions(params: { types: IType[]; rawAbiFunctions: IRawAbiFunction[] }) {
  const { types, rawAbiFunctions } = params;
  const functions: IFunction[] = rawAbiFunctions.map((rawAbiFunction) =>
    makeFunction({ types, rawAbiFunction })
  );
  return functions;
}
