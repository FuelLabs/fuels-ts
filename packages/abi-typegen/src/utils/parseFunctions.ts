import type { IFunction } from '../types/interfaces/IFunction';
import type { IRawAbiFunction } from '../types/interfaces/IRawAbiFunction';
import type { IType } from '../types/interfaces/IType';

import { makeFunction } from './makeFunction';

export function parseFunctions(params: { types: IType[]; rawAbiFunctions: IRawAbiFunction[] }) {
  const { types, rawAbiFunctions } = params;
  const functions: IFunction[] = rawAbiFunctions.map((rawAbiFunction) =>
    makeFunction({ types, rawAbiFunction })
  );
  return functions;
}
