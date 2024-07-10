import { Function } from '../abi/functions/Function';
import type { JsonAbiFunction } from '../types/interfaces/IRawAbiFunction';
import type { IType } from '../types/interfaces/IType';

export function makeFunction(params: { types: IType[]; rawAbiFunction: JsonAbiFunction }) {
  const { types, rawAbiFunction } = params;
  return new Function({ types, rawAbiFunction });
}
