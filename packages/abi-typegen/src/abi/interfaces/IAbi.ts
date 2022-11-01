import type { IRawAbiFunction } from './IAbiFunction';
import type { IRawAbiTypeRoot } from './IAbiType';

export interface IRawAbi {
  types: IRawAbiTypeRoot[];
  functions: IRawAbiFunction[];
  loggedTypes: any[];
}
