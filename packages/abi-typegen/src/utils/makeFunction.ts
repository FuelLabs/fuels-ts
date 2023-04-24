import { Function } from '../abi/functions/Function';
import type { IRawAbiFunction } from '../types/interfaces/IRawAbiFunction';
import type { IType } from '../types/interfaces/IType';

export function makeFunction(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
  const { types, rawAbiFunction } = params;
  return new Function({ types, rawAbiFunction });
}
