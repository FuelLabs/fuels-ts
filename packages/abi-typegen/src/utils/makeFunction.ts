import { Function } from '../functions/Function';
import type { IRawAbiFunction } from '../interfaces/IRawAbiFunction';
import type { IType } from '../interfaces/IType';

export function makeFunction(params: { types: IType[]; rawAbiFunction: IRawAbiFunction }) {
  const { types, rawAbiFunction } = params;
  return new Function({ types, rawAbiFunction });
}
