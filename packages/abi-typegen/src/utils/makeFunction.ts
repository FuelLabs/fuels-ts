import { Function } from '../abi/functions/Function';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiFunction } from '../types/interfaces/JsonAbi';

export function makeFunction(params: { types: IType[]; rawAbiFunction: JsonAbiFunction }) {
  const { types, rawAbiFunction } = params;
  return new Function({ types, rawAbiFunction });
}
