import type { IFunction } from '../types/interfaces/IFunction';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiFunction } from '../types/interfaces/JsonAbi';

import { makeFunction } from './makeFunction';

export function parseFunctions(params: {
  types: IType[];
  rawAbiFunctions: readonly JsonAbiFunction[];
}) {
  const { types, rawAbiFunctions } = params;
  const functions: IFunction[] = rawAbiFunctions.map((rawAbiFunction) =>
    makeFunction({ types, rawAbiFunction })
  );
  return functions;
}
