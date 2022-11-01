import type { IRawAbiFunction } from './IRawAbiFunction';
import type { IRawAbiTypeRoot } from './IRawAbiType';

export interface IRawAbi {
  types: IRawAbiTypeRoot[];
  functions: IRawAbiFunction[];
  loggedTypes: any[];
}
