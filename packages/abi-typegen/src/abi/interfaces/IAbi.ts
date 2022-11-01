import type { IAbiFunction } from './IAbiFunction';
import type { IAbiTypeRoot } from './IAbiType';

export interface IAbi {
  types: IAbiTypeRoot[];
  functions: IAbiFunction[];
  loggedTypes: any[];
}
