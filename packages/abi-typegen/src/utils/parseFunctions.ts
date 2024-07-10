import type { IFunction } from '../types/interfaces/IFunction';
import type { JsonAbiFunction } from '../types/interfaces/IRawAbiFunction';
import type { IType } from '../types/interfaces/IType';

import { makeFunction } from './makeFunction';

export function parseFunctions(params: { types: IType[]; rawAbiFunctions: JsonAbiFunction[] }) {
  const { types, rawAbiFunctions } = params;
  const functions: IFunction[] = rawAbiFunctions.map((rawAbiFunction) =>
    makeFunction({ types, rawAbiFunction })
  );
  return functions;
}
