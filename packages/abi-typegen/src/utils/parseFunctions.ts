import type { IType } from '../types/interfaces/IType';
import type { JsonAbi } from '../types/interfaces/JsonAbiNew';

import { makeFunction } from './makeFunction';

export function parseFunctions(params: { types: IType[]; rawAbiFunctions: JsonAbi['functions'] }) {
  const { types, rawAbiFunctions } = params;
  const functions = rawAbiFunctions.map((rawAbiFunction) =>
    makeFunction({ types, rawAbiFunction })
  );
  return functions;
}
