import type { IFunction } from 'src/interfaces/IFunction';
import type { IRawAbiFunction } from 'src/interfaces/IRawAbiFunction';
import type { IType } from 'src/interfaces/IType';

import { Function } from '../functions/Function';

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
